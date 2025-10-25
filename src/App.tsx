import { useEffect } from 'react';
import { CartProvider } from './application/context/CartContext';
import { AuthProvider } from './application/context/AuthContext';
import { ModalProvider } from './application/context/ModalContext';
import HomePage from './presentation/pages/HomePage.tsx';
import { AnimationManager } from './infrastructure/services/AnimationManager';

function App() {
  useEffect(() => {
    // Inicializar animaciones cuando el DOM está listo
    const animationManager = new AnimationManager();
    
    return () => {
      // Cleanup si es necesario
      animationManager.resetAnimations();
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <ModalProvider>
          <HomePage />
        </ModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
