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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>JJ Hernández</h2>
          <span className="nav-subtitle">Tech Consultant</span>
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <li><a href="#inicio" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}>Inicio</a></li>
          <li><a href="#servicios" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('#servicios'); }}>Servicios</a></li>
          <li><a href="#tecnologias" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('#tecnologias'); }}>Tecnologías</a></li>
          <li><a href="#portafolio" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('#portafolio'); }}>Portafolio</a></li>
          <li><a href="#experiencia" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('#experiencia'); }}>Experiencia</a></li>
          <li><a href="#contacto" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('#contacto'); }}>Contacto</a></li>
        </ul>

        <div className="nav-actions">
          {!isAuthenticated ? (
            <div className="auth-guest">
              <button className="btn btn-secondary" onClick={openLogin}>Iniciar Sesión</button>
              <button className="btn btn-primary" onClick={openRegister}>Registrarse</button>
            </div>
          ) : (
            <div className="auth-user">
              <button 
                className="user-menu-btn" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <i className="fas fa-user"></i>
                <span>{user?.firstName}</span>
                <i className={`fas fa-chevron-${isUserMenuOpen ? 'up' : 'down'}`}></i>
              </button>
              <div className={`user-dropdown ${isUserMenuOpen ? 'active' : ''}`}>
                <a href="#profile" onClick={(e) => { e.preventDefault(); openProfile(); setIsUserMenuOpen(false); }}>
                  <i className="fas fa-user"></i>
                  Mi Perfil
                </a>
                <a href="#orders" onClick={(e) => { e.preventDefault(); openOrders(); setIsUserMenuOpen(false); }}>
                  <i className="fas fa-shopping-bag"></i>
                  Mis Órdenes
                </a>
                <a href="#logout" onClick={(e) => { e.preventDefault(); logout(); setIsUserMenuOpen(false); }}>
                  <i className="fas fa-sign-out-alt"></i>
                  Cerrar Sesión
                </a>
              </div>
            </div>
          )}
          
          <button id="cart-button" className="cart-button" onClick={onOpenCart}>
            <i className="fas fa-shopping-cart"></i>
            {itemCount > 0 && (
              <span id="cart-count" className="cart-count" style={{ display: 'flex' }}>
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <div 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
