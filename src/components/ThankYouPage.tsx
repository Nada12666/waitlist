interface ThankYouPageProps {
  onNavigate: (page: 'home' | 'register' | 'thank-you') => void;
}

export function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  const scrollToSection = (sectionId: string) => {
    onNavigate('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white w-full py-6 px-6 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <button 
            onClick={() => onNavigate('home')}
            className="text-brand-primary hover:opacity-80 transition-opacity"
          >
            <h2 className="text-brand-primary font-bold text-3xl">سحابة الأثر</h2>
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="min-h-screen flex items-center justify-center px-6 py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          {/* العنوان الرئيسي */}
          <h1 className="text-brand-primary font-bold text-4xl lg:text-5xl mb-6 leading-tight">
            شكرا لتسجيلك على سحابة الأثر
          </h1>

          {/* الفقرة التوضيحية */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-gray-800 text-lg lg:text-xl leading-relaxed mb-6">
              لقد استلمنا طلب التسجيل الخاص بك، وستكون من بين الأوائل الذين يحصلون على وصول مبكر وتجربة مميزة مع منصتنا.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              تابع بريدك الإلكتروني للحصول على التحديثات القادمة.
            </p>
          </div>

          {/* زر العودة للصفحة الرئيسية */}
          <div className="mb-16">
            <button
              onClick={() => onNavigate('home')}
              className="bg-brand-primary text-white px-10 py-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>

          {/* معلومات إضافية */}
          <div className="bg-gray-50 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-brand-primary font-bold text-xl mb-4">ماذا يحدث الآن؟</h3>
            <div className="space-y-3 text-gray-700">
              <div className="text-center">
                <span>سيتواصل معك فريقنا خلال 24 ساعة</span>
              </div>
              <div className="text-center">
                <span>ستحصل على دعوة للوصول المبكر للمنصة</span>
              </div>
              <div className="text-center">
                <span>ستكون من أوائل من يجرب منصة سحابة الأثر</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* الفوتر */}
      <footer className="bg-brand-primary py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-4">سحابة الأثر</h3>
            <p className="text-white opacity-90 mb-6">
              مدعومة من أثرنا
            </p>
            <div className="border-t border-white border-opacity-20 pt-6">
              <p className="text-white opacity-70 text-sm">
                © 2025 سحابة الأثر. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}