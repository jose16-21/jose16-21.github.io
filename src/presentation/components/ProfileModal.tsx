import React, { useState } from 'react';
import { useAuth } from '../../application/hooks/useAuth';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || ''
  });
  const notificationManager = new NotificationManager();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement update user profile
      notificationManager.show({
        message: 'Perfil actualizado exitosamente',
        type: 'success'
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      notificationManager.show({
        message: 'Error al actualizar el perfil',
        type: 'error'
      });
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      company: user?.company || '',
      phone: user?.phone || ''
    });
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-lighter sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-dark flex items-center gap-3"><i className="fas fa-user text-primary"></i> Mi Perfil</h2>
          <button className="w-10 h-10 bg-gray-lighter hover:bg-gray-light rounded-full flex items-center justify-center text-gray-dark hover:text-dark transition-colors text-2xl" onClick={handleClose}>&times;</button>
        </div>
        
        <div className="p-6">
          {!isEditing ? (
            <div>
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-user text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-dark">{user.firstName} {user.lastName}</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-lighter rounded-lg p-4">
                  <label className="flex items-center gap-2 text-gray-dark font-medium mb-2"><i className="fas fa-envelope text-primary"></i> Email</label>
                  <p className="text-dark">{user.email}</p>
                </div>
                
                {user.company && (
                  <div className="bg-gray-lighter rounded-lg p-4">
                    <label className="flex items-center gap-2 text-gray-dark font-medium mb-2"><i className="fas fa-building text-primary"></i> Empresa</label>
                    <p className="text-dark">{user.company}</p>
                  </div>
                )}
                
                {user.phone && (
                  <div className="bg-gray-lighter rounded-lg p-4">
                    <label className="flex items-center gap-2 text-gray-dark font-medium mb-2"><i className="fas fa-phone text-primary"></i> Teléfono</label>
                    <p className="text-dark">{user.phone}</p>
                  </div>
                )}

                <div className="bg-gray-lighter rounded-lg p-4">
                  <label className="flex items-center gap-2 text-gray-dark font-medium mb-2"><i className="fas fa-calendar text-primary"></i> Miembro desde</label>
                  <p className="text-dark">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}</p>
                </div>
              </div>

              <button 
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i>
                Editar Perfil
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-dark mb-2">Nombre</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-dark mb-2">Apellido</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-light rounded-lg bg-gray-lighter opacity-60 cursor-not-allowed"
                />
                <small className="text-gray-medium text-sm">
                  El email no puede ser modificado
                </small>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-dark mb-2">Empresa</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-dark mb-2">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+502 3132-2197"
                  className="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-dark font-semibold rounded-lg border-2 border-gray-light hover:bg-gray-lighter transition-all"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
                  <i className="fas fa-save"></i>
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
