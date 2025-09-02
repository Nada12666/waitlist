interface NavbarProps {
  onNavigate: (page: 'home' | 'register' | 'thank-you') => void;
  currentPage: 'home' | 'register' | 'thank-you';
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (currentPage !== 'home') {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white w-full py-4 px-6 shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* الشعار في اليمين */}
        <div className="flex-shrink-0">
          <button 
            onClick={scrollToTop}
            className="text-brand-primary hover:opacity-80 transition-opacity"
          >
            <h2 className="text-brand-primary font-bold text-2xl">سحابة الأثر</h2>
          </button>
        </div>
        
        {/* الروابط في اليسار */}
        <div className="flex space-x-6 space-x-reverse items-center">
          <button 
            onClick={() => scrollToSection('mission')}
            className="text-brand-primary hover:opacity-80 transition-opacity px-4 py-2 font-bold"
          >
            رسالتنا
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-brand-primary hover:opacity-80 transition-opacity px-4 py-2 font-bold"
          >
            خدماتنا
          </button>
          <button 
            onClick={() => onNavigate('register')}
            className={`bg-brand-primary text-white hover:opacity-90 transition-opacity px-6 py-2 rounded-lg font-bold ${
              currentPage === 'register' ? 'opacity-100 shadow-lg' : ''
            }`}
          >
            انضم إلينا
          </button>
        </div>
      </div>
    </nav>
  );
}