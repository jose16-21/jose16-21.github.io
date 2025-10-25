import React, { useState, useEffect } from 'react';
import { useAuth } from '../../application/hooks/useAuth';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onShowLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [recaptchaError, setRecaptchaError] = useState(false);
  const { register } = useAuth();
  const notificationManager = new NotificationManager();

  useEffect(() => {
    if (isOpen && window.grecaptcha) {
      // Render reCAPTCHA when modal opens
      setTimeout(() => {
        const container = document.getElementById('register-recaptcha-container');
        if (container && container.children.length === 0 && window.grecaptcha) {
          try {
            window.grecaptcha.render('register-recaptcha-container', {
              sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            });
          } catch {
            console.log('reCAPTCHA not loaded yet');
          }
        }
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone
      });
      notificationManager.show({
        message: '¡Cuenta creada exitosamente!',
        type: 'success'
      });
      onClose();
      resetForm();
    } catch (error) {
      console.error('Register error:', error);
      notificationManager.show({
        message: 'Error al crear la cuenta. Intenta de nuevo.',
        type: 'error'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      phone: ''
    });
    setErrors({});
    setRecaptchaError(false);
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  console.log('🔷 RegisterModal render - isOpen:', isOpen);

  if (!isOpen) return null;

  return (
    <div className="auth-modal active" onClick={handleClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2><i className="fas fa-user-plus"></i> Crear Cuenta</h2>
          <button className="auth-modal-close" onClick={handleClose}>&times;</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="register-firstName">Nombre</label>
              <input
                type="text"
                id="register-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="register-lastName">Apellido</label>
              <input
                type="text"
                id="register-lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="register-password">Contraseña</label>
              <input
                type="password"
                id="register-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="register-confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="register-confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="register-company">Empresa (opcional)</label>
              <input
                type="text"
                id="register-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-phone">Teléfono (opcional)</label>
              <input
                type="tel"
                id="register-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+502 3132-2197"
              />
            </div>
          </div>
          <div className="form-group">
            <div id="register-recaptcha-container" className="g-recaptcha"></div>
            {recaptchaError && (
              <div id="register-recaptcha-error" className="error-message" style={{ display: 'block' }}>
                Por favor, completa la verificación reCAPTCHA
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            <i className="fas fa-user-plus"></i>
            Crear Cuenta
          </button>
        </form>
        <div className="auth-footer">
          <p>¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }}>Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
