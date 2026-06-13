import React, { useState } from 'react';
import { useAuth } from '../../application/hooks/useAuth';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';
import { useFocusTrap } from '../../application/hooks/useFocusTrap';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowRegister: () => void;
}

import { FaSignInAlt, FaTimes, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const notificationManager = new NotificationManager();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      notificationManager.show({
        message: '¡Sesión iniciada exitosamente!',
        type: 'success'
      });
      handleClose();
    } catch (error) {
      console.error('Login error:', error);
      notificationManager.show({
        message: 'Error al iniciar sesión. Intenta de nuevo.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    onClose();
  };

  const handleSwitchToRegister = () => {
    handleClose();
    onShowRegister();
  };

  const containerRef = useFocusTrap(isOpen, handleClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up"
      >
        {/* Header con imagen de fondo */}
        <div className="relative h-40 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
              alt="Login background"
              className="w-full h-full object-cover opacity-60"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-2xl">
                <FaSignInAlt className="text-2xl text-white" />
              </div>
              <div>
                <h2 id="login-modal-title" className="text-2xl font-bold text-white">{t('auth.login.title')}</h2>
                <p className="text-gray-300 text-sm">{t('auth.login.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            aria-label={t('common.close')}
            className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all text-white border border-white/10 z-20"
          >
            <FaTimes aria-hidden="true" className="text-lg" />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all bg-gray-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all bg-gray-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Iniciando...
              </>
            ) : (
              <>
                <FaSignInAlt />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            <button
              onClick={handleSwitchToRegister}
              className="text-primary font-semibold hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
