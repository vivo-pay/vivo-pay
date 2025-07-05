
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, FileText, Users, LogOut, Home, Calendar, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User, Session } from '@supabase/supabase-js';

const DashboardTenant = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
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
                <p className="text-gray-600">דשבורד שוכר</p>
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
        {/* Alert for missing landlord connection */}
        <Card className="mb-8 border-vivo-orange-200 bg-vivo-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-vivo-orange-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-vivo-orange-800 mb-2">
                  התחבר לבעל הדירה שלך
                </h3>
                <p className="text-vivo-orange-700 mb-4">
                  כדי להתחיל לנהל תשלומים, עליך להתחבר עם בעל הדירה שלך או להזמין אותו לפלטפורמה
                </p>
                <Button className="bg-vivo-orange-500 hover:bg-vivo-orange-600 text-white">
                  הזמן את בעל הדירה
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-vivo-teal-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-montserrat flex items-center justify-between">
                <span>תשלום הבא</span>
                <Calendar className="h-5 w-5 text-vivo-teal-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 mb-1">₪4,200</div>
              <div className="text-sm text-gray-600 mb-3">1 בינואר 2025</div>
              <Badge variant="secondary" className="bg-vivo-orange-100 text-vivo-orange-800">
                שכר דירה + חשבונות
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-vivo-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-montserrat flex items-center justify-between">
                <span>מצב החשבון</span>
                <CreditCard className="h-5 w-5 text-vivo-orange-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">מעודכן</div>
              <div className="text-sm text-gray-600 mb-3">כל התשלומים בוצעו</div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ללא חובות
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-vivo-teal-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-montserrat flex items-center justify-between">
                <span>קבלות</span>
                <FileText className="h-5 w-5 text-vivo-teal-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
              <div className="text-sm text-gray-600 mb-3">קבלות השנה</div>
              <Button size="sm" variant="outline" className="text-vivo-teal-600 border-vivo-teal-300">
                הורד הכל
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat">תשלומים אחרונים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">שכר דירה דצמבר</div>
                      <div className="text-sm text-gray-600">1 בדצמבר 2024</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold">₪3,500</div>
                    <Badge className="bg-green-100 text-green-800">שולם</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">חשבון חשמל</div>
                      <div className="text-sm text-gray-600">15 בנובמבר 2024</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold">₪280</div>
                    <Badge className="bg-green-100 text-green-800">שולם</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">חשבון מים</div>
                      <div className="text-sm text-gray-600">10 בנובמבר 2024</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold">₪120</div>
                    <Badge className="bg-green-100 text-green-800">שולם</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Info & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat">הנכס שלי</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-vivo-teal-50 rounded-lg">
                  <Home className="h-8 w-8 text-vivo-teal-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">דירת 3 חדרים</h3>
                    <p className="text-gray-600 text-sm mb-2">רחוב הרצל 15, תל אביב</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">3 חדרים</Badge>
                      <Badge variant="secondary">קומה 2</Badge>
                      <Badge variant="secondary">מעלית</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">פעולות מהירות</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center justify-center space-x-2 h-12">
                      <FileText className="h-4 w-4" />
                      <span>הורד קבלות</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center space-x-2 h-12">
                      <CreditCard className="h-4 w-4" />
                      <span>עדכן תשלום</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 col-span-2">
                      <Users className="h-4 w-4" />
                      <span>צור קשר עם בעל הדירה</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardTenant;
