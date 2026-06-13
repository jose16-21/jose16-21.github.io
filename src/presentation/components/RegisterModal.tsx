import React, { useState } from 'react';
import { useAuth } from '../../application/hooks/useAuth';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';
import { useFocusTrap } from '../../application/hooks/useFocusTrap';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowLogin: () => void;
}

import { FaUserPlus, FaTimes, FaUser, FaEnvelope, FaLock, FaBuilding, FaPhone, FaSpinner } from 'react-icons/fa';

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
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const notificationManager = new NotificationManager();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'Requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'Requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Requerido';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mín. 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'No coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
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
      handleClose();
    } catch (error) {
      console.error('Register error:', error);
      notificationManager.show({
        message: 'Error al crear la cuenta. Intenta de nuevo.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
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
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchToLogin = () => {
    handleClose();
    onShowLogin();
  };

  const containerRef = useFocusTrap(isOpen, handleClose);

  if (!isOpen) return null;

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm transition-all bg-gray-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-modal-title"
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col animate-slide-up"
      >
        {/* Header con imagen de fondo */}
        <div className="relative h-36 w-full overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="Register background"
              className="w-full h-full object-cover opacity-60"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-5 z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-2xl">
                <FaUserPlus className="text-xl text-white" />
              </div>
              <div>
                <h2 id="register-modal-title" className="text-xl font-bold text-white">{t('auth.register.title')}</h2>
                <p className="text-gray-300 text-sm">{t('auth.register.subtitle')}</p>
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

        {/* Form - Scrollable */}
        <form className="p-6 space-y-4 overflow-y-auto flex-1" onSubmit={handleSubmit}>
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUser className="text-xs" />
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Juan"
                  className={inputClass('firstName')}
                />
              </div>
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUser className="text-xs" />
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Pérez"
                  className={inputClass('lastName')}
                />
              </div>
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaEnvelope className="text-xs" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={inputClass('email')}
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock className="text-xs" />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClass('password')}
                />
              </div>
              {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock className="text-xs" />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClass('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Empresa y Teléfono (opcionales) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa <span className="text-gray-400 font-normal text-xs">(opcional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaBuilding className="text-xs" />
                </span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Tu empresa"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all bg-gray-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono <span className="text-gray-400 font-normal text-xs">(opcional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaPhone className="text-xs" />
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+502 1234-5678"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all bg-gray-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
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
                Creando cuenta...
              </>
            ) : (
              <>
                <FaUserPlus />
                Crear Cuenta
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center flex-shrink-0">
          <p className="text-sm text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={handleSwitchToLogin}
              className="text-primary font-semibold hover:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
