import { useState } from 'react';
import { submitRegistration, type RegistrationData } from '../services/registrationService';

interface RegisterPageProps {
  onNavigate: (page: 'home' | 'register' | 'thank-you') => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    country: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.organization || !formData.country || !formData.city) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'يرجى ملء جميع الحقول المطلوبة' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    console.log('Form submission started with data:', {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      // Don't log sensitive data
    });

    try {
      const registrationData: RegistrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        country: formData.country,
        city: formData.city,
      };

      const result = await submitRegistration(registrationData);

      console.log('Registration result:', result);

      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message });
        // التوجه إلى صفحة الشكر بعد ثانيتين
        setTimeout(() => {
          onNavigate('thank-you');
        }, 2000);
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: result.error ? `${result.message}\n\nتفاصيل الخطأ: ${result.error}` : result.message 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: `حدث خطأ غير متوقع: ${error instanceof Error ? error.message : 'Unknown error'}. يرجى المحاولة مرة أخرى.` 
      });
    } finally {
      setIsSubmitting(false);
    }
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
              {/* رسالة النجاح أو الخطأ */}
              {submitMessage && (
                <div className={`p-4 rounded-xl text-center font-bold ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              {/* الاسم الكامل */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="أدخل اسمك الكامل"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* زر الإرسال */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all transform shadow-lg ${
                    isSubmitting 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-brand-primary text-white hover:opacity-90 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب التسجيل'}
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
