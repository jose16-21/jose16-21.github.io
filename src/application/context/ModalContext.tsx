import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

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

  const openLogin = useCallback(() => {
    setIsLoginOpen(true);
  }, []);
  
  const openRegister = useCallback(() => {
    setIsRegisterOpen(true);
  }, []);

  const openProfile = useCallback(() => {
    setIsProfileOpen(true);
  }, []);

  const openOrders = useCallback(() => {
    setIsOrdersOpen(true);
  }, []);
  
  const closeLogin = useCallback(() => {
    setIsLoginOpen(false);
  }, []);
  
  const closeRegister = useCallback(() => {
    setIsRegisterOpen(false);
  }, []);

  const closeProfile = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  const closeOrders = useCallback(() => {
    setIsOrdersOpen(false);
  }, []);

  const switchToRegister = useCallback(() => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }, []);

  const switchToLogin = useCallback(() => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }, []);

  const value = useMemo(() => ({
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
  }), [
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
  ]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
