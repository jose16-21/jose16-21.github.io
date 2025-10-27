import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './application/context/CartContext';
import { AuthProvider } from './application/context/AuthContext';
import { ModalProvider } from './application/context/ModalContext';
import HomePage from './presentation/pages/HomePage.tsx';
import CartPage from './presentation/pages/CartPage.tsx';
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
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/carrito" element={<CartPage />} />
            </Routes>
          </ModalProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
