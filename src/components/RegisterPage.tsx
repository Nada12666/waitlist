import { useState } from 'react';

interface RegisterPageProps {
  onNavigate: (page: 'home' | 'register' | 'thank-you') => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    country: '',
    city: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // معالجة إرسال النموذج
    console.log('Form data:', formData);
    // التوجه إلى صفحة الشكر
    onNavigate('thank-you');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* الهيدر */}
      <section className="bg-brand-primary py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white font-bold text-4xl lg:text-5xl mb-8 leading-tight">
            انضم إلى قائمة الانتظار وكن من الأوائل فى تجربة سحابة الأثر
          </h1>
          <p className="text-white opacity-90 leading-relaxed max-w-3xl mx-auto text-lg">
            املأ النموذج التالى لتحصل على وصول مبكر وتجربة مميزة مع سحابة الأثر
          </p>
        </div>
      </section>

      {/* نموذج التسجيل */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            <h2 className="text-brand-primary font-bold text-3xl mb-10 text-center">بيانات التسجيل</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* الاسم الكامل */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              {/* البريد الإلكتروني */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="example@email.com"
                  required
                />
              </div>

              {/* رقم الجوال */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="+966 XX XXX XXXX"
                  required
                />
              </div>

              {/* اسم المنظمة */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  اسم المنظمة
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="أدخل اسم المنظمة"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* الدولة */}
                <div>
                  <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                    الدولة
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                    placeholder="أدخل اسم الدولة"
                    required
                  />
                </div>

                {/* المدينة */}
                <div>
                  <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                    المدينة
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                    placeholder="أدخل اسم المدينة"
                    required
                  />
                </div>
              </div>

              {/* زر الإرسال */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white py-4 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
                >
                  إرسال طلب التسجيل
                </button>
                <p className="text-gray-500 text-center mt-4 text-sm">
                  سنتواصل معك خلال 24 ساعة من إرسال الطلب
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>



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
    </div>
  );
}