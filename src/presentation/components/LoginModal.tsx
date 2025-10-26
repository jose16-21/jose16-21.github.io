import React, { useState, useEffect } from 'react';
import { useAuth } from '../../application/hooks/useAuth';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaError, setRecaptchaError] = useState(false);
  const { login } = useAuth();
  const notificationManager = new NotificationManager();

  useEffect(() => {
    if (isOpen && window.grecaptcha) {
      // Render reCAPTCHA when modal opens
      setTimeout(() => {
        const container = document.getElementById('login-recaptcha-container');
        if (container && container.children.length === 0 && window.grecaptcha) {
          try {
            window.grecaptcha.render('login-recaptcha-container', {
              sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            });
          } catch {
            console.log('reCAPTCHA not loaded yet');
          }
        }
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate reCAPTCHA only if it's loaded
    if (window.grecaptcha) {
      const recaptchaResponse = window.grecaptcha.getResponse();
      if (!recaptchaResponse) {
        setRecaptchaError(true);
        return;
      }
    }
    
    setRecaptchaError(false);

    try {
      await login(email, password);
      notificationManager.show({
        message: '¡Sesión iniciada exitosamente!',
        type: 'success'
      });
      onClose();
      // Reset form
      setEmail('');
      setPassword('');
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (error) {
      console.error('Login error:', error);
      notificationManager.show({
        message: 'Error al iniciar sesión. Intenta de nuevo.',
        type: 'error'
      });
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setRecaptchaError(false);
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
    onClose();
  };

  console.log('🔷 LoginModal render - isOpen:', isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-lighter">
          <h2 className="text-2xl font-bold text-dark flex items-center gap-3"><i className="fas fa-sign-in-alt text-primary"></i> Iniciar Sesión</h2>
          <button className="w-10 h-10 bg-gray-lighter hover:bg-gray-light rounded-full flex items-center justify-center text-gray-dark hover:text-dark transition-colors text-2xl" onClick={handleClose}>&times;</button>
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-dark mb-2">Email</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-dark mb-2">Contraseña</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <div id="login-recaptcha-container" className="g-recaptcha"></div>
            {recaptchaError && (
              <div id="login-recaptcha-error" className="text-danger text-sm mt-2">
                Por favor, completa la verificación reCAPTCHA
              </div>
            )}
          </div>
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
            <i className="fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </button>
        </form>
        <div className="p-6 pt-0 text-center">
          <p className="text-gray-medium">¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onShowRegister(); }} className="text-primary font-semibold hover:underline">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
