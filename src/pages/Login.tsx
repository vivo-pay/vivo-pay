
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User, Session } from '@supabase/supabase-js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users
        if (session?.user) {
          const userRole = session.user.user_metadata?.role;
          console.log('User logged in with role:', userRole);
          
          if (userRole === 'tenant') {
            navigate('/dashboard-tenant');
          } else if (userRole === 'landlord') {
            navigate('/dashboard-landlord');
          } else {
            navigate('/dashboard-tenant'); // Default fallback
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Existing session:', session);
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Attempting to sign in with:", email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast({
          title: "שגיאה בהתחברות",
          description: error.message === "Invalid login credentials" 
            ? "כתובת אימייל או סיסמה שגויים" 
            : error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Login successful:", data);
      toast({
        title: "התחברת בהצלחה!",
        description: "מועבר לדשבורד...",
      });

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

  // If user is already logged in, don't show login form
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vivo-teal-50 to-vivo-orange-50 flex items-center justify-center font-poppins">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold font-montserrat text-2xl">V</span>
          </div>
          <p className="text-gray-600">מועבר לדשבורד...</p>
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
          התחברות לחשבון
        </h2>
        <p className="text-center text-gray-600">
          הכנס את הפרטים שלך כדי להתחבר
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-800 font-montserrat">
              ברוך הבא חזרה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="הכנס את הסיסמה שלך"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600 hover:from-vivo-teal-600 hover:to-vivo-teal-700 text-white"
                disabled={loading}
              >
                {loading ? 'מתחבר...' : 'התחברות'}
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center mt-6 space-y-4">
              <Link to="/register" className="text-sm text-vivo-teal-600 hover:text-vivo-teal-700 block">
                אין לך חשבון? הירשם כאן
              </Link>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 block">
                שכחת סיסמה?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
