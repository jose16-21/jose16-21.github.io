import { DOMUtils, ValidationUtils, StorageUtils } from '../utils';
import { NotificationManager } from './NotificationManager';
import type { User } from '../types';

export class ProfileManager {
  private notificationManager: NotificationManager;
  private profileModal: HTMLElement | null = null;

  constructor() {
    this.notificationManager = new NotificationManager();
    this.init();
  }

  private init(): void {
    this.createProfileModal();
    this.setupEventListeners();
  }

  private createProfileModal(): void {
    const modal = DOMUtils.createElement('div', {
      attributes: { id: 'profile-modal' },
      className: 'profile-modal'
    });

    modal.innerHTML = `
      <div class="profile-modal-content">
        <div class="profile-modal-header">
          <h2><i class="fas fa-user"></i> Mi Perfil</h2>
          <button class="profile-modal-close">&times;</button>
        </div>
        <div class="profile-modal-body">
          <form class="profile-form" id="profile-form">
            <div class="profile-section">
              <h3>Información Personal</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-firstName">Nombre</label>
                  <input type="text" id="profile-firstName" name="firstName" required>
                </div>
                <div class="form-group">
                  <label for="profile-lastName">Apellido</label>
                  <input type="text" id="profile-lastName" name="lastName" required>
                </div>
              </div>
              <div class="form-group">
                <label for="profile-email">Email</label>
                <input type="email" id="profile-email" name="email" required readonly>
                <small class="form-help">El email no se puede modificar</small>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-company">Empresa</label>
                  <input type="text" id="profile-company" name="company">
                </div>
                <div class="form-group">
                  <label for="profile-phone">Teléfono</label>
                  <input type="tel" id="profile-phone" name="phone">
                </div>
              </div>
            </div>

            <div class="profile-section">
              <h3>Dirección</h3>
              <div class="form-group">
                <label for="profile-street">Dirección</label>
                <input type="text" id="profile-street" name="street">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-city">Ciudad</label>
                  <input type="text" id="profile-city" name="city">
                </div>
                <div class="form-group">
                  <label for="profile-state">Estado/Provincia</label>
                  <input type="text" id="profile-state" name="state">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-zipCode">Código Postal</label>
                  <input type="text" id="profile-zipCode" name="zipCode">
                </div>
                <div class="form-group">
                  <label for="profile-country">País</label>
                  <select id="profile-country" name="country">
                    <option value="">Seleccionar país</option>
                    <option value="MX">México</option>
                    <option value="US">Estados Unidos</option>
                    <option value="CA">Canadá</option>
                    <option value="ES">España</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="PE">Perú</option>
                    <option value="CL">Chile</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="profile-section">
              <h3>Cambiar Contraseña</h3>
              <div class="form-group">
                <label for="profile-currentPassword">Contraseña Actual</label>
                <input type="password" id="profile-currentPassword" name="currentPassword">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-newPassword">Nueva Contraseña</label>
                  <input type="password" id="profile-newPassword" name="newPassword" minlength="6">
                </div>
                <div class="form-group">
                  <label for="profile-confirmNewPassword">Confirmar Nueva Contraseña</label>
                  <input type="password" id="profile-confirmNewPassword" name="confirmNewPassword">
                </div>
              </div>
            </div>

            <div class="profile-actions">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-modal').style.display='none'">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-save"></i>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.profileModal = modal;
    this.setupProfileForm();
  }

  private setupEventListeners(): void {
    document.addEventListener('showProfile', () => {
      this.showProfileModal();
    });
  }

  private setupProfileForm(): void {
    const form = DOMUtils.querySelector<HTMLFormElement>('#profile-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleProfileUpdate();
    });

    // Setup modal close events
    if (this.profileModal) {
      const closeBtn = this.profileModal.querySelector('.profile-modal-close');
      closeBtn?.addEventListener('click', () => this.hideProfileModal());

      this.profileModal.addEventListener('click', (e) => {
        if (e.target === this.profileModal) this.hideProfileModal();
      });
    }
  }

  private showProfileModal(): void {
    if (!this.profileModal) return;

    const currentUser = StorageUtils.getItem<User>('currentUser');
    if (!currentUser) return;

    this.populateProfileForm(currentUser);
    this.profileModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  private hideProfileModal(): void {
    if (!this.profileModal) return;

    this.profileModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  private populateProfileForm(user: User): void {
    const form = DOMUtils.querySelector<HTMLFormElement>('#profile-form');
    if (!form) return;

    // Personal info
    (form.querySelector('#profile-firstName') as HTMLInputElement).value = user.firstName;
    (form.querySelector('#profile-lastName') as HTMLInputElement).value = user.lastName;
    (form.querySelector('#profile-email') as HTMLInputElement).value = user.email;
    (form.querySelector('#profile-company') as HTMLInputElement).value = user.company || '';
    (form.querySelector('#profile-phone') as HTMLInputElement).value = user.phone || '';

    // Address
    if (user.address) {
      (form.querySelector('#profile-street') as HTMLInputElement).value = user.address.street || '';
      (form.querySelector('#profile-city') as HTMLInputElement).value = user.address.city || '';
      (form.querySelector('#profile-state') as HTMLInputElement).value = user.address.state || '';
      (form.querySelector('#profile-zipCode') as HTMLInputElement).value = user.address.zipCode || '';
      (form.querySelector('#profile-country') as HTMLSelectElement).value = user.address.country || '';
    }
  }

  private async handleProfileUpdate(): Promise<void> {
    const form = DOMUtils.querySelector<HTMLFormElement>('#profile-form');
    if (!form) return;

    const currentUser = StorageUtils.getItem<User>('currentUser');
    if (!currentUser) return;

    const formData = new FormData(form);
    const newPassword = formData.get('newPassword') as string;
    const confirmNewPassword = formData.get('confirmNewPassword') as string;

    // Validate password change if provided
    if (newPassword || confirmNewPassword) {
      if (!ValidationUtils.minLength(newPassword, 6)) {
        this.notificationManager.show({
          message: 'La nueva contraseña debe tener al menos 6 caracteres.',
          type: 'error'
        });
        return;
      }

      if (newPassword !== confirmNewPassword) {
        this.notificationManager.show({
          message: 'Las contraseñas no coinciden.',
          type: 'error'
        });
        return;
      }
    }

    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.innerHTML;

    try {
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
      submitButton.disabled = true;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user data
      const updatedUser: User = {
        ...currentUser,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        company: formData.get('company') as string || undefined,
        phone: formData.get('phone') as string || undefined,
        address: {
          street: formData.get('street') as string || '',
          city: formData.get('city') as string || '',
          state: formData.get('state') as string || '',
          zipCode: formData.get('zipCode') as string || '',
          country: formData.get('country') as string || ''
        }
      };

      this.updateUser(updatedUser);
      this.hideProfileModal();

      this.notificationManager.show({
        message: 'Perfil actualizado exitosamente.',
        type: 'success'
      });

    } catch (error) {
      this.notificationManager.show({
        message: 'Error al actualizar el perfil. Intenta nuevamente.',
        type: 'error'
      });
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  private updateUser(user: User): void {
    // Update in users array
    const users = StorageUtils.getItem<User[]>('users') || [];
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex >= 0) {
      users[userIndex] = user;
      StorageUtils.setItem('users', users);
    }

    // Update current user
    StorageUtils.setItem('currentUser', user);

    // Update UI
    const userName = DOMUtils.querySelector('#user-name');
    if (userName) {
      userName.textContent = user.firstName;
    }
  }
}