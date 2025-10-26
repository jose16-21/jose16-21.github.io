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
    <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-lighter sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-dark flex items-center gap-3"><i className="fas fa-user-plus text-primary"></i> Crear Cuenta</h2>
          <button className="w-10 h-10 bg-gray-lighter hover:bg-gray-light rounded-full flex items-center justify-center text-gray-dark hover:text-dark transition-colors text-2xl" onClick={handleClose}>&times;</button>
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="register-firstName" className="block text-sm font-medium text-gray-dark mb-2">Nombre</label>
              <input
                type="text"
                id="register-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.firstName && <span className="text-danger text-sm mt-1">{errors.firstName}</span>}
            </div>
            <div>
              <label htmlFor="register-lastName" className="block text-sm font-medium text-gray-dark mb-2">Apellido</label>
              <input
                type="text"
                id="register-lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.lastName && <span className="text-danger text-sm mt-1">{errors.lastName}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-dark mb-2">Email</label>
            <input
              type="email"
              id="register-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.email && <span className="text-danger text-sm mt-1">{errors.email}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-dark mb-2">Contraseña</label>
              <input
                type="password"
                id="register-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.password && <span className="text-danger text-sm mt-1">{errors.password}</span>}
            </div>
            <div>
              <label htmlFor="register-confirmPassword" className="block text-sm font-medium text-gray-dark mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                id="register-confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.confirmPassword && <span className="text-danger text-sm mt-1">{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="register-company" className="block text-sm font-medium text-gray-dark mb-2">Empresa (opcional)</label>
              <input
                type="text"
                id="register-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="register-phone" className="block text-sm font-medium text-gray-dark mb-2">Teléfono (opcional)</label>
              <input
                type="tel"
                id="register-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+502 3132-2197"
                className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <div id="register-recaptcha-container" className="g-recaptcha"></div>
            {recaptchaError && (
              <div id="register-recaptcha-error" className="text-danger text-sm mt-2">
                Por favor, completa la verificación reCAPTCHA
              </div>
            )}
          </div>
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
            <i className="fas fa-user-plus"></i>
            Crear Cuenta
          </button>
        </form>
        <div className="p-6 pt-0 text-center">
          <p className="text-gray-medium">¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }} className="text-primary font-semibold hover:underline">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
