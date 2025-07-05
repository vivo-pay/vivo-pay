
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Users, CreditCard, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vivo-teal-50 to-vivo-orange-50 font-poppins">
      {/* Header Navigation */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold font-montserrat text-xl">V</span>
            </div>
            <span className="text-2xl font-bold font-montserrat bg-gradient-to-r from-vivo-teal-600 to-vivo-orange-600 bg-clip-text text-transparent">
              Vivo
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-vivo-teal-600 transition-colors">
              התחברות
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600 hover:from-vivo-teal-600 hover:to-vivo-teal-700 text-white">
                הרשמה
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6 leading-tight">
            <span className="bg-gradient-to-r from-vivo-teal-600 to-vivo-orange-600 bg-clip-text text-transparent">
              ניהול חכם
            </span>
            <br />
            <span className="text-gray-800">לשכר דירה</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            פלטפורמה מתקדמת המחברת בין שוכרים לבעלי דירות לניהול אוטומטי של תשלומי שכר דירה וחשבונות חודשיים
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600 hover:from-vivo-teal-600 hover:to-vivo-teal-700 text-white px-8 py-3 text-lg">
                התחל עכשיו
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-vivo-orange-300 text-vivo-orange-600 hover:bg-vivo-orange-50 px-8 py-3 text-lg">
              איך זה עובד?
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold font-montserrat text-gray-800 mb-4">
            למה לבחור ב-Vivo?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            הפלטפורמה המתקדמת ביותר לניהול נכסים ותשלומים בישראל
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-vivo-teal-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-vivo-teal-500 to-vivo-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-montserrat mb-4 text-gray-800">
                תשלומים אוטומטיים
              </h3>
              <p className="text-gray-600 leading-relaxed">
                ניהול חכם של תשלומי שכר דירה, מים, חשמל וארנונה. הכל במקום אחד, אוטומטי ובטוח
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-vivo-orange-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-vivo-orange-500 to-vivo-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-montserrat mb-4 text-gray-800">
                חיבור קל ומהיר
              </h3>
              <p className="text-gray-600 leading-relaxed">
                מערכת הזמנות פשוטה המאפשרת לשוכרים ובעלי דירות להתחבר ולהתחיל לעבוד תוך דקות
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-vivo-teal-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold font-montserrat mb-4 text-gray-800">
                דשבורד מתקדם
              </h3>
              <p className="text-gray-600 leading-relaxed">
                מעקב בזמן אמת אחר תשלומים, קבלות דיגיטליות וניהול מלא של כל הנכסים
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold font-montserrat text-gray-800 mb-6">
                הפתרון המושלם לכולם
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-vivo-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">לשוכרים</h4>
                    <p className="text-gray-600">שלם בקלות, קבל קבלות אוטומטיות, עקוב אחר החשבונות</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-vivo-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">לבעלי דירות</h4>
                    <p className="text-gray-600">נהל נכסים, קבל תשלומים, הזמן שוכרים חדשים</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-vivo-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">בטיחות מלאה</h4>
                    <p className="text-gray-600">הצפנה מתקדמת, אבטחת מידע וציות לתקנות הגנת הפרטיות</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-vivo-teal-100 to-vivo-orange-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold font-montserrat text-3xl">V</span>
                  </div>
                  <p className="text-gray-600 font-medium">ממשק נקי ואינטואיטיבי</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-montserrat mb-6">
            מוכנים להתחיל?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            הצטרפו לאלפי משתמשים המנהלים את הנכסים שלהם בקלות ובביטחון
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-vivo-teal-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold">
              הרשמה חינם
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-vivo-teal-500 to-vivo-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold font-montserrat">V</span>
                </div>
                <span className="text-xl font-bold font-montserrat">Vivo</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                הפלטפורמה המתקדמת לניהול שכר דירה בישראל
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-montserrat">המוצר</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">איך זה עובד</a></li>
                <li><a href="#" className="hover:text-white transition-colors">תמחור</a></li>
                <li><a href="#" className="hover:text-white transition-colors">אבטחה</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-montserrat">חברה</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">אודות</a></li>
                <li><a href="#" className="hover:text-white transition-colors">צור קשר</a></li>
                <li><a href="#" className="hover:text-white transition-colors">קריירה</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-montserrat">תמיכה</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">מרכז עזרה</a></li>
                <li><a href="#" className="hover:text-white transition-colors">שאלות נפוצות</a></li>
                <li><a href="#" className="hover:text-white transition-colors">פרטיות</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Vivo. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
