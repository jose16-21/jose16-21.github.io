import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextValue {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isProfileOpen: boolean;
  isOrdersOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  openProfile: () => void;
  openOrders: () => void;
  closeLogin: () => void;
  closeRegister: () => void;
  closeProfile: () => void;
  closeOrders: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const openLogin = () => {
    console.log('🔵 openLogin called');
    setIsLoginOpen(true);
  };
  
  const openRegister = () => {
    console.log('🔵 openRegister called');
    setIsRegisterOpen(true);
  };

  const openProfile = () => {
    console.log('🔵 openProfile called');
    setIsProfileOpen(true);
  };

  const openOrders = () => {
    console.log('🔵 openOrders called');
    setIsOrdersOpen(true);
  };
  
  const closeLogin = () => {
    console.log('🔴 closeLogin called');
    setIsLoginOpen(false);
  };
  
  const closeRegister = () => {
    console.log('🔴 closeRegister called');
    setIsRegisterOpen(false);
  };

  const closeProfile = () => {
    console.log('🔴 closeProfile called');
    setIsProfileOpen(false);
  };

  const closeOrders = () => {
    console.log('🔴 closeOrders called');
    setIsOrdersOpen(false);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <ModalContext.Provider value={{
      isLoginOpen,
      isRegisterOpen,
      isProfileOpen,
      isOrdersOpen,
      openLogin,
      openRegister,
      openProfile,
      openOrders,
      closeLogin,
      closeRegister,
      closeProfile,
      closeOrders,
      switchToRegister,
      switchToLogin,
    }}>
      {children}
    </ModalContext.Provider>
  );
};
