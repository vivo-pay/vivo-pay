
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Home, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User, Session } from '@supabase/supabase-js';

const AddProperty = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    numUnits: 1,
    description: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numUnits' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "שגיאה",
        description: "משתמש לא מחובר",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log("Adding property:", formData);

    try {
      const { error } = await supabase.from("properties").insert([{
        landlord_id: user.id,
        address: formData.address,
        city: formData.city,
        num_units: formData.numUnits,
      }]);

      if (error) {
        console.error("Error adding property:", error);
        toast({
          title: "שגיאה",
          description: "אירעה שגיאה בהוספת הנכס",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "הנכס נוסף בהצלחה!",
        description: "הנכס החדש שלך נוסף למערכת",
      });

      // Reset form
      setFormData({
        address: "",
        city: "",
        numUnits: 1,
        description: "",
      });

      // Navigate back to dashboard with full page reload
      window.location.href = "/dashboard-landlord";
      
    } catch (error: any) {
      console.error("Error adding property:", error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהוספת הנכס",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
          <div className="flex items-center space-x-4">
            <Link to="/dashboard-landlord">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>חזור לדשבורד</span>
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold font-montserrat">V</span>
            </div>
            <h1 className="text-2xl font-bold font-montserrat text-gray-800">
              הוסף נכס חדש
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 font-montserrat">
              <Home className="h-6 w-6 text-vivo-teal-600" />
              <span>פרטי הנכס</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>כתובת מלאה</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="רחוב הרצל 15"
                  />
                </div>

                <div>
                  <Label htmlFor="city">עיר</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="תל אביב"
                  />
                </div>
              </div>

              {/* Number of Units */}
              <div>
                <Label htmlFor="numUnits">מספר יחידות דיור</Label>
                <Input
                  id="numUnits"
                  name="numUnits"
                  type="number"
                  min="1"
                  value={formData.numUnits}
                  onChange={handleInputChange}
                  required
                  className="mt-1 max-w-xs"
                  placeholder="1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  כמה יחידות דיור יש בנכס זה?
                </p>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">תיאור הנכס</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="תיאור קצר של הנכס (אופציונלי)"
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600 hover:from-vivo-teal-600 hover:to-vivo-teal-700 text-white flex-1"
                  disabled={loading}
                >
                  {loading ? 'מוסיף נכס...' : 'הוסף נכס'}
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
                <Link to="/dashboard-landlord" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    ביטול
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="mt-8 border-vivo-orange-200 bg-vivo-orange-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-vivo-orange-800 mb-3">
              💡 טיפים לניהול נכס
            </h3>
            <ul className="space-y-2 text-sm text-vivo-orange-700">
              <li>• וודא שהכתובת מדויקת לצורך משלוח קבלות</li>
              <li>• אחרי הוספת הנכס תוכל להזמין שוכרים</li>
              <li>• ניתן לערוך את פרטי הנכס בכל עת</li>
              <li>• המערכת תנהל עבורך את כל התשלומים והחשבונות</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddProperty;
