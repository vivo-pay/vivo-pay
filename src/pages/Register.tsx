
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, User, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserRole = 'tenant' | 'landlord';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "שגיאה",
        description: "אנא בחר תפקיד",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log("Attempting to register user with:", { email, role: selectedRole, fullName });

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            role: selectedRole,
            full_name: fullName,
          }
        }
      });

      if (error) {
        console.error("Registration error:", error);
        toast({
          title: "שגיאה בהרשמה",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Registration successful:", data);
      toast({
        title: "ההרשמה בוצעה בהצלחה!",
        description: "נשלח אליך מייל אישור. אנא לחץ על הקישור במייל כדי להפעיל את החשבון",
      });

      // Clear form
      setEmail("");
      setPassword("");
      setFullName("");
      setSelectedRole(null);
      
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה לא צפויה",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vivo-teal-50 to-vivo-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-poppins">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center items-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold font-montserrat text-2xl">V</span>
            </div>
            <span className="text-3xl font-bold font-montserrat bg-gradient-to-r from-vivo-teal-600 to-vivo-orange-600 bg-clip-text text-transparent">
              Vivo
            </span>
          </Link>
          <h2 className="text-center text-3xl font-bold font-montserrat text-gray-900 mb-2">
            בחר את התפקיד שלך
          </h2>
          <p className="text-center text-gray-600">
            כדי להמשיך, אנא בחר את סוג המשתמש שלך
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="grid md:grid-cols-2 gap-6 px-4">
            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-vivo-teal-300"
              onClick={() => handleRoleSelect('tenant')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-montserrat mb-3 text-gray-800">
                  אני שוכר
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  אני שוכר דירה ורוצה לנהל את התשלומים שלי בצורה נוחה ואוטומטית
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-vivo-orange-300"
              onClick={() => handleRoleSelect('landlord')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-vivo-orange-500 to-vivo-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-montserrat mb-3 text-gray-800">
                  אני בעל דירה
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  אני בעלים של נכס ורוצה לנהל את השוכרים והתשלומים שלי ביעילות
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/login" className="text-vivo-teal-600 hover:text-vivo-teal-700">
              כבר יש לך חשבון? התחבר כאן
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vivo-teal-50 to-vivo-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-poppins">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold font-montserrat text-2xl">V</span>
          </div>
          <span className="text-3xl font-bold font-montserrat bg-gradient-to-r from-vivo-teal-600 to-vivo-orange-600 bg-clip-text text-transparent">
            Vivo
          </span>
        </Link>
        <h2 className="text-center text-3xl font-bold font-montserrat text-gray-900 mb-2">
          יצירת חשבון {selectedRole === 'tenant' ? 'שוכר' : 'בעל דירה'}
        </h2>
        <p className="text-center text-gray-600">
          מלא את הפרטים כדי להתחיל
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedRole === 'tenant' 
                    ? 'bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600' 
                    : 'bg-gradient-to-r from-vivo-orange-500 to-vivo-orange-600'
                }`}>
                  {selectedRole === 'tenant' ? 
                    <User className="h-5 w-5 text-white" /> : 
                    <Home className="h-5 w-5 text-white" />
                  }
                </div>
                <span className="font-medium text-gray-700">
                  {selectedRole === 'tenant' ? 'שוכר' : 'בעל דירה'}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedRole(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                שנה תפקיד
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">שם מלא</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="הכנס את השם המלא שלך"
                />
              </div>

              <div>
                <Label htmlFor="email">כתובת אימייל</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="הכנס את כתובת האימייל שלך"
                />
              </div>

              <div>
                <Label htmlFor="password">סיסמה</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="בחר סיסמה (לפחות 6 תווים)"
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className={`w-full ${
                  selectedRole === 'tenant' 
                    ? 'bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600 hover:from-vivo-teal-600 hover:to-vivo-teal-700' 
                    : 'bg-gradient-to-r from-vivo-orange-500 to-vivo-orange-600 hover:from-vivo-orange-600 hover:to-vivo-orange-700'
                } text-white`}
                disabled={loading}
              >
                {loading ? 'יוצר חשבון...' : 'הרשמה'}
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center mt-6">
              <Link to="/login" className="text-sm text-vivo-teal-600 hover:text-vivo-teal-700">
                כבר יש לך חשבון? התחבר כאן
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
