import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './application/context/CartContext';
import { AuthProvider } from './application/context/AuthContext';
import { ModalProvider } from './application/context/ModalContext';
import HomePage from './presentation/pages/HomePage.tsx';
import { AnimationManager } from './infrastructure/services/AnimationManager';

const CartPage = lazy(() => import('./presentation/pages/CartPage.tsx'));

function App() {
  useEffect(() => {
    const animationManager = new AnimationManager();
    return () => {
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
              <Route
                path="/carrito"
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    </div>
                  }>
                    <CartPage />
                  </Suspense>
                }
              />
            </Routes>
          </ModalProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
