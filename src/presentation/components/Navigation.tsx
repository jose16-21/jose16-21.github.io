import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../../application/hooks/useCart';
import { useAuth } from '../../application/hooks/useAuth';
import { useModal } from '../../application/context/ModalContext';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { openLogin, openRegister, openProfile, openOrders } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      // Mostrar logo después de pasar la sección Hero (aproximadamente 600px)
      setShowLogo(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // Si estamos en la página del carrito, navegar a home con hash
    if (location.pathname !== '/') {
      navigate(`/${sectionId}`);
    } else {
      // Ya estamos en home, solo hacer scroll
      const element = document.querySelector(sectionId);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
      ? 'bg-white shadow-lg border-gray-200'
      : 'bg-white/90 backdrop-blur-sm border-gray-100'
      }`} id="navbar">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className={`flex items-center gap-2 cursor-pointer group transition-all duration-300 ${showLogo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white font-bold text-sm">JJH</span>
            </div>
          </Link>

          {/* Menú móvil desplegable */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto`}>
            <ul className="list-none flex flex-col p-4 gap-2">
              <li><a href="#inicio" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2.5 px-3 rounded-lg hover:bg-gray-lighter" onClick={(e) => handleNavClick(e, '#inicio')}>Inicio</a></li>
              <li><a href="#servicios" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2.5 px-3 rounded-lg hover:bg-gray-lighter" onClick={(e) => handleNavClick(e, '#servicios')}>Servicios</a></li>
              <li><a href="#tecnologias" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2.5 px-3 rounded-lg hover:bg-gray-lighter" onClick={(e) => handleNavClick(e, '#tecnologias')}>Tecnologías</a></li>
              <li><a href="#portafolio" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2.5 px-3 rounded-lg hover:bg-gray-lighter" onClick={(e) => handleNavClick(e, '#portafolio')}>Portafolio</a></li>
              <li><a href="#experiencia" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2.5 px-3 rounded-lg hover:bg-gray-lighter" onClick={(e) => handleNavClick(e, '#experiencia')}>Experiencia</a></li>
              <li><a href="#contacto" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2.5 px-3 rounded-lg hover:bg-gray-lighter" onClick={(e) => handleNavClick(e, '#contacto')}>Contacto</a></li>
            </ul>

            {!isAuthenticated && (
              <div className="flex items-center gap-2 p-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg text-gray-dark border border-gray-light hover:border-primary hover:text-primary transition-all" onClick={() => { openLogin(); setIsMenuOpen(false); }}>Iniciar Sesión</button>
                <button className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-primary text-white hover:shadow-lg transition-all" onClick={() => { openRegister(); setIsMenuOpen(false); }}>Registrarse</button>
              </div>
            )}
          </div>

          {/* Menú desktop */}
          <ul className="hidden lg:flex list-none gap-6">
            <li><a href="#inicio" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2" onClick={(e) => handleNavClick(e, '#inicio')}>Inicio</a></li>
            <li><a href="#servicios" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2" onClick={(e) => handleNavClick(e, '#servicios')}>Servicios</a></li>
            <li><a href="#tecnologias" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2" onClick={(e) => handleNavClick(e, '#tecnologias')}>Tecnologías</a></li>
            <li><a href="#portafolio" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2" onClick={(e) => handleNavClick(e, '#portafolio')}>Portafolio</a></li>
            <li><a href="#experiencia" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2" onClick={(e) => handleNavClick(e, '#experiencia')}>Experiencia</a></li>
            <li><a href="#contacto" className="text-gray-dark font-medium hover:text-primary transition-colors block py-2" onClick={(e) => handleNavClick(e, '#contacto')}>Contacto</a></li>
          </ul>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-2">
                <button className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-dark border border-gray-light hover:border-primary hover:text-primary transition-all" onClick={openLogin}>Iniciar Sesión</button>
                <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-primary text-white hover:shadow-lg transition-all" onClick={openRegister}>Registrarse</button>
              </div>
            ) : (
              <div className="relative hidden lg:block">
                <button className="flex items-center gap-2 bg-white border border-gray-light text-primary px-4 py-2 rounded-lg cursor-pointer transition-all font-semibold text-sm hover:border-primary" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                  <i className="fas fa-user"></i>
                  <span>{user?.firstName}</span>
                  <i className={`fas fa-chevron-${isUserMenuOpen ? 'up' : 'down'} text-xs`}></i>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[200px] mt-2 overflow-hidden">
                    <a href="#profile" className="flex items-center gap-3 px-4 py-3 text-gray-dark no-underline transition-all border-b border-gray-lighter font-medium text-sm hover:bg-gray-lighter hover:text-primary" onClick={(e) => { e.preventDefault(); openProfile(); setIsUserMenuOpen(false); }}>
                      <i className="fas fa-user w-4"></i>Mi Perfil
                    </a>
                    <a href="#orders" className="flex items-center gap-3 px-4 py-3 text-gray-dark no-underline transition-all border-b border-gray-lighter font-medium text-sm hover:bg-gray-lighter hover:text-primary" onClick={(e) => { e.preventDefault(); openOrders(); setIsUserMenuOpen(false); }}>
                      <i className="fas fa-shopping-bag w-4"></i>Mis Órdenes
                    </a>
                    <a href="#logout" className="flex items-center gap-3 px-4 py-3 text-gray-dark no-underline transition-all font-medium text-sm hover:bg-gray-lighter hover:text-error" onClick={(e) => { e.preventDefault(); logout(); setIsUserMenuOpen(false); }}>
                      <i className="fas fa-sign-out-alt w-4"></i>Cerrar Sesión
                    </a>
                  </div>
                )}
              </div>
            )}

            <Link
              to="/carrito"
              className="relative bg-gradient-primary text-white rounded-lg w-11 h-11 flex items-center justify-center cursor-pointer transition-all hover:shadow-lg"
            >
              <i className="fas fa-shopping-cart"></i>
              {itemCount > 0 && (<span className="absolute -top-1 -right-1 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{itemCount}</span>)}
            </Link>

            <button className="lg:hidden flex flex-col gap-1 w-8 h-8 items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className={`w-5 h-0.5 bg-gray-dark transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-gray-dark transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-gray-dark transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
