import React from 'react';
import Navigation from '../components/Navigation.tsx';
import Hero from '../components/Hero.tsx';
import Services from '../components/Services.tsx';
import Technologies from '../components/Technologies.tsx';
import Portfolio from '../components/Portfolio.tsx';
import Experience from '../components/Experience.tsx';
import Contact from '../components/Contact.tsx';
import Footer from '../components/Footer.tsx';
import CartModal from '../components/CartModal.tsx';
import LoginModal from '../components/LoginModal.tsx';
import RegisterModal from '../components/RegisterModal.tsx';
import ProfileModal from '../components/ProfileModal.tsx';
import OrdersModal from '../components/OrdersModal.tsx';
import { useModal } from '../../application/context/ModalContext';

const HomePage: React.FC = () => {
  const { 
    isLoginOpen, 
    isRegisterOpen, 
    isCartOpen,
    isProfileOpen,
    isOrdersOpen,
    closeLogin, 
    closeRegister, 
    closeCart,
    closeProfile,
    closeOrders,
    switchToRegister,
    switchToLogin,
    openCart 
  } = useModal();

  return (
    <div>
      <Navigation onOpenCart={openCart} />
      <Hero />
      <Services />
      <Technologies />
      <Portfolio />
      <Experience />
      <Contact />
      <Footer />
      
      {/* Modals */}
      <CartModal isOpen={isCartOpen} onClose={closeCart} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onShowRegister={switchToRegister} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} onShowLogin={switchToLogin} />
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
      <OrdersModal isOpen={isOrdersOpen} onClose={closeOrders} />
    </div>
  );
};

export default HomePage;
