import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Home, Users, CreditCard, LogOut, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User, Session } from '@supabase/supabase-js';

const DashboardLandlord = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/login');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user) return;

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("landlord_id", user.id);

      if (error) {
        console.error("Error fetching properties:", error);
      } else {
        setProperties(data || []);
      }

      setLoadingProperties(false);
    };

    fetchProperties();
  }, [user?.id, location.pathname]);

  const handleSignOut = async () => {
    console.log("Signing out...");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהתנתקות",
        variant: "destructive",
      });
    } else {
      toast({
        title: "התנתקת בהצלחה",
        description: "להתראות!",
      });
      navigate('/');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vivo-teal-50 to-vivo-orange-50 flex items-center justify-center font-poppins">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold font-montserrat text-2xl">V</span>
          </div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vivo-teal-50 to-vivo-orange-50 font-poppins">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold font-montserrat text-xl">V</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-montserrat text-gray-800">
                  שלום, {user.user_metadata?.full_name || user.email}
                </h1>
                <p className="text-gray-600">דשבורד בעל דירה</p>
              </div>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>התנתק</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link to="/landlord/add-property">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-vivo-teal-200 bg-gradient-to-r from-vivo-teal-50 to-vivo-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-vivo-teal-500 rounded-full flex items-center justify-center">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat text-gray-800">הוסף נכס חדש</h3>
                    <p className="text-gray-600 text-sm">הוסף נכס חדש לניהול</p>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-vivo-teal-600 mr-auto" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-vivo-orange-200 bg-gradient-to-r from-vivo-orange-50 to-vivo-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-vivo-orange-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold font-montserrat text-gray-800">הזמן שוכר</h3>
                  <p className="text-gray-600 text-sm">שלח הזמנה לשוכר חדש</p>
                </div>
                <ArrowLeft className="h-5 w-5 text-vivo-orange-600 mr-auto" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-vivo-teal-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-montserrat flex items-center justify-between">
                <span>סך נכסים</span>
                <Home className="h-5 w-5 text-vivo-teal-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{properties.length}</div>
              <p className="text-sm text-gray-600">נכסים בניהול</p>
            </CardContent>
          </Card>

          <Card className="border-vivo-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-montserrat flex items-center justify-between">
                <span>שוכרים</span>
                <Users className="h-5 w-5 text-vivo-orange-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">0</div>
              <p className="text-sm text-gray-600">שוכרים פעילים</p>
            </CardContent>
          </Card>

          <Card className="border-vivo-teal-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-montserrat flex items-center justify-between">
                <span>הכנסות חודש</span>
                <CreditCard className="h-5 w-5 text-vivo-teal-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₪0</div>
              <p className="text-sm text-gray-600">דצמבר 2024</p>
            </CardContent>
          </Card>

          <Card className="border-vivo-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-montserrat">
                תשלומים ממתינים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">0</div>
              <p className="text-sm text-gray-600">ממתינים לתשלום</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Properties List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-montserrat">הנכסים שלי</CardTitle>
              <Link to="/landlord/add-property">
                <Button size="sm" className="bg-vivo-teal-500 hover:bg-vivo-teal-600">
                  <Plus className="h-4 w-4 mr-2" />
                  הוסף נכס
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loadingProperties ? (
                <p className="text-center py-8">טוען נכסים...</p>
              ) : properties.length === 0 ? (
                <div className="text-center py-12">
                  <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">לא נמצאו נכסים</h3>
                  <p className="text-gray-500 mb-4">התחל בהוספת הנכס הראשון שלך</p>
                  <Link to="/landlord/add-property">
                    <Button className="bg-vivo-teal-500 hover:bg-vivo-teal-600">
                      הוסף נכס ראשון
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {properties.map((property) => (
                    <Card key={property.id} className="border p-4">
                      <div className="text-lg font-semibold">{property.address}</div>
                      <div className="text-sm text-gray-600">{property.city}</div>
                      <div className="text-sm">יחידות דיור: {property.num_units}</div>
                      <div className="text-sm text-gray-500">
                        נוצר בתאריך: {new Date(property.created_at).toLocaleDateString()}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat">פעילות אחרונה</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">אין פעילות עדיין</h3>
                <p className="text-gray-500">התשלומים והפעילות יוצגו כאן</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Guide */}
        <Card className="mt-8 border-vivo-orange-200 bg-vivo-orange-50">
          <CardHeader>
            <CardTitle className="font-montserrat text-vivo-orange-800">
              מדריך התחלה מהירה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-vivo-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-vivo-orange-800">הוסף נכס</h4>
                  <p className="text-sm text-vivo-orange-700">התחל בהוספת הנכס הראשון שלך למערכת</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-vivo-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-vivo-orange-800">הזמן שוכרים</h4>
                  <p className="text-sm text-vivo-orange-700">שלח הזמנות לשוכרים שלך להצטרף</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-vivo-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-vivo-orange-800">נהל תשלומים</h4>
                  <p className="text-sm text-vivo-orange-700">עקוב אחר התשלומים באופן אוטומטי</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardLandlord;
