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
    <div className="auth-modal active" onClick={handleClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2><i className="fas fa-sign-in-alt"></i> Iniciar Sesión</h2>
          <button className="auth-modal-close" onClick={handleClose}>&times;</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Contraseña</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div id="login-recaptcha-container" className="g-recaptcha"></div>
            {recaptchaError && (
              <div id="login-recaptcha-error" className="error-message" style={{ display: 'block' }}>
                Por favor, completa la verificación reCAPTCHA
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            <i className="fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </button>
        </form>
        <div className="auth-footer">
          <p>¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onShowRegister(); }}>Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
