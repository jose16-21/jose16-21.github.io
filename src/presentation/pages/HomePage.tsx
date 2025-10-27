import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation.tsx';
import Hero from '../components/Hero.tsx';
import Services from '../components/Services.tsx';
import Technologies from '../components/Technologies.tsx';
import Portfolio from '../components/Portfolio.tsx';
import Experience from '../components/Experience.tsx';
import Contact from '../components/Contact.tsx';
import Footer from '../components/Footer.tsx';
import LoginModal from '../components/LoginModal.tsx';
import RegisterModal from '../components/RegisterModal.tsx';
import ProfileModal from '../components/ProfileModal.tsx';
import OrdersModal from '../components/OrdersModal.tsx';
import { useModal } from '../../application/context/ModalContext';

const HomePage: React.FC = () => {
  const location = useLocation();
  const { 
    isLoginOpen, 
    isRegisterOpen, 
    isProfileOpen,
    isOrdersOpen,
    closeLogin, 
    closeRegister, 
    closeProfile,
    closeOrders,
    switchToRegister,
    switchToLogin
  } = useModal();

  useEffect(() => {
    // Si venimos con un hash, hacer scroll a esa sección
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si no hay hash, hacer scroll al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div>
      <Navigation />
      <Hero />
      <Services />
      <Technologies />
      <Portfolio />
      <Experience />
      <Contact />
      <Footer />
      
      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onShowRegister={switchToRegister} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} onShowLogin={switchToLogin} />
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
      <OrdersModal isOpen={isOrdersOpen} onClose={closeOrders} />
    </div>
  );
};

export default HomePage;
