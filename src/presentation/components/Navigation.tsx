import React, { useState, useEffect } from 'react';
import { useCart } from '../../application/hooks/useCart';
import { useAuth } from '../../application/hooks/useAuth';
import { useModal } from '../../application/context/ModalContext';

interface NavigationProps {
  onOpenCart: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { openLogin, openRegister, openProfile, openOrders } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-lighter z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`} id="navbar">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-primary">JJ Hernández</h2>
          <span className="text-xs text-gray-medium font-medium">Tech Consultant</span>
        </div>
        
        <ul className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex list-none gap-8 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent flex-col lg:flex-row p-8 lg:p-0 shadow-lg lg:shadow-none transition-all`} id="nav-menu">
          <li><a href="#inicio" className="text-gray-dark font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:bg-primary after:transition-all hover:after:w-full" onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}>Inicio</a></li>
          <li><a href="#servicios" className="text-gray-dark font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:bg-primary after:transition-all hover:after:w-full" onClick={(e) => { e.preventDefault(); scrollToSection('#servicios'); }}>Servicios</a></li>
          <li><a href="#tecnologias" className="text-gray-dark font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:bg-primary after:transition-all hover:after:w-full" onClick={(e) => { e.preventDefault(); scrollToSection('#tecnologias'); }}>Tecnologías</a></li>
          <li><a href="#portafolio" className="text-gray-dark font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:bg-primary after:transition-all hover:after:w-full" onClick={(e) => { e.preventDefault(); scrollToSection('#portafolio'); }}>Portafolio</a></li>
          <li><a href="#experiencia" className="text-gray-dark font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:bg-primary after:transition-all hover:after:w-full" onClick={(e) => { e.preventDefault(); scrollToSection('#experiencia'); }}>Experiencia</a></li>
          <li><a href="#contacto" className="text-gray-dark font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:bg-primary after:transition-all hover:after:w-full" onClick={(e) => { e.preventDefault(); scrollToSection('#contacto'); }}>Contacto</a></li>
        </ul>

        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 text-sm font-semibold rounded-md bg-transparent text-gray-dark border-2 border-gray-light hover:bg-gray-lighter hover:border-primary hover:text-primary transition-all" onClick={openLogin}>Iniciar Sesión</button>
              <button className="px-5 py-2.5 text-sm font-semibold rounded-md bg-primary text-white border-2 border-primary hover:bg-secondary hover:border-secondary hover:-translate-y-0.5 hover:shadow-lg transition-all" onClick={openRegister}>Registrarse</button>
            </div>
          ) : (
            <div className="relative">
              <button 
                className="flex items-center gap-3 bg-white border-2 border-gray-light text-primary px-5 py-2.5 rounded-md cursor-pointer transition-all font-semibold text-sm hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-0.5 hover:shadow-md" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <i className="fas fa-user"></i>
                <span>{user?.firstName}</span>
                <i className={`fas fa-chevron-${isUserMenuOpen ? 'up' : 'down'}`}></i>
              </button>
              <div className={`absolute top-full right-0 bg-white border border-gray-lighter rounded-lg shadow-xl min-w-[220px] mt-2 transition-all duration-300 ${isUserMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <a href="#profile" className="flex items-center gap-4 px-5 py-4 text-gray-dark no-underline transition-all border-b border-gray-lighter font-medium text-sm hover:bg-gradient-to-r hover:from-gray-lighter hover:to-gray-50 hover:text-primary" onClick={(e) => { e.preventDefault(); openProfile(); setIsUserMenuOpen(false); }}>
                  <i className="fas fa-user w-4 text-center"></i>
                  Mi Perfil
                </a>
                <a href="#orders" className="flex items-center gap-4 px-5 py-4 text-gray-dark no-underline transition-all border-b border-gray-lighter font-medium text-sm hover:bg-gradient-to-r hover:from-gray-lighter hover:to-gray-50 hover:text-primary" onClick={(e) => { e.preventDefault(); openOrders(); setIsUserMenuOpen(false); }}>
                  <i className="fas fa-shopping-bag w-4 text-center"></i>
                  Mis Órdenes
                </a>
                <a href="#logout" className="flex items-center gap-4 px-5 py-4 text-gray-dark no-underline transition-all font-medium text-sm hover:bg-gradient-to-r hover:from-gray-lighter hover:to-gray-50 hover:text-primary" onClick={(e) => { e.preventDefault(); logout(); setIsUserMenuOpen(false); }}>
                  <i className="fas fa-sign-out-alt w-4 text-center"></i>
                  Cerrar Sesión
                </a>
              </div>
            </div>
          )}
          
          <button id="cart-button" className="relative bg-primary text-white border-none rounded-xl w-12 h-12 flex items-center justify-center cursor-pointer transition-all text-lg shadow-md hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg" onClick={onOpenCart}>
            <i className="fas fa-shopping-cart"></i>
            {itemCount > 0 && (
              <span id="cart-count" className="absolute -top-2 -right-2 bg-error text-white rounded-full w-5.5 h-5.5 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <div 
          className="lg:hidden flex flex-col cursor-pointer gap-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-gray-dark transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-dark transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-dark transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
