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
    <div className="auth-modal active" onClick={handleClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2><i className="fas fa-user"></i> Mi Perfil</h2>
          <button className="auth-modal-close" onClick={handleClose}>&times;</button>
        </div>
        
        <div className="profile-content">
          {!isEditing ? (
            <div className="profile-view">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  <i className="fas fa-user"></i>
                </div>
                <h3>{user.firstName} {user.lastName}</h3>
              </div>

              <div className="profile-info">
                <div className="info-group">
                  <label><i className="fas fa-envelope"></i> Email</label>
                  <p>{user.email}</p>
                </div>
                
                {user.company && (
                  <div className="info-group">
                    <label><i className="fas fa-building"></i> Empresa</label>
                    <p>{user.company}</p>
                  </div>
                )}
                
                {user.phone && (
                  <div className="info-group">
                    <label><i className="fas fa-phone"></i> Teléfono</label>
                    <p>{user.phone}</p>
                  </div>
                )}

                <div className="info-group">
                  <label><i className="fas fa-calendar"></i> Miembro desde</label>
                  <p>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}</p>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-full"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i>
                Editar Perfil
              </button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Nombre</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Apellido</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
                <small style={{ color: 'var(--gray-medium)', fontSize: '0.875rem' }}>
                  El email no puede ser modificado
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+502 3132-2197"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
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
