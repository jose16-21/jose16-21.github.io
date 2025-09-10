import { DOMUtils, ValidationUtils, StorageUtils } from '../utils';
import { NotificationManager } from './NotificationManager';
import type { User, RegisterFormData, LoginFormData } from '../types';

export class AuthManager {
  private currentUser: User | null = null;
  private notificationManager: NotificationManager;
  private loginModal: HTMLElement | null = null;
  private registerModal: HTMLElement | null = null;

  constructor() {
    this.notificationManager = new NotificationManager();
    this.loadCurrentUser();
    this.init();
  }

  private init(): void {
    this.createAuthModals();
    this.setupAuthButtons();
    this.updateAuthUI();
  }

  private createAuthModals(): void {
    this.createLoginModal();
    this.createRegisterModal();
  }

  private createLoginModal(): void {
    const modal = DOMUtils.createElement('div', {
      attributes: { id: 'login-modal' },
      className: 'auth-modal'
    });

    modal.innerHTML = `
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</h2>
          <button class="auth-modal-close">&times;</button>
        </div>
        <form class="auth-form" id="login-form">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" name="email" required>
          </div>
          <div class="form-group">
            <label for="login-password">Contraseña</label>
            <input type="password" id="login-password" name="password" required>
          </div>
          <div class="form-group">
            <div id="login-recaptcha-container" class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
            <div id="login-recaptcha-error" class="error-message" style="display: none;">
              Por favor, completa la verificación reCAPTCHA
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-full">
            <i class="fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </button>
        </form>
        <div class="auth-footer">
          <p>¿No tienes cuenta? <a href="#" id="show-register">Regístrate aquí</a></p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.loginModal = modal;
    this.setupLoginForm();
  }

  private createRegisterModal(): void {
    const modal = DOMUtils.createElement('div', {
      attributes: { id: 'register-modal' },
      className: 'auth-modal'
    });

    modal.innerHTML = `
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2><i class="fas fa-user-plus"></i> Crear Cuenta</h2>
          <button class="auth-modal-close">&times;</button>
        </div>
        <form class="auth-form" id="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="register-firstName">Nombre</label>
              <input type="text" id="register-firstName" name="firstName" required>
            </div>
            <div class="form-group">
              <label for="register-lastName">Apellido</label>
              <input type="text" id="register-lastName" name="lastName" required>
            </div>
          </div>
          <div class="form-group">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" name="email" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="register-password">Contraseña</label>
              <input type="password" id="register-password" name="password" required minlength="6">
            </div>
            <div class="form-group">
              <label for="register-confirmPassword">Confirmar Contraseña</label>
              <input type="password" id="register-confirmPassword" name="confirmPassword" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="register-company">Empresa (opcional)</label>
              <input type="text" id="register-company" name="company">
            </div>
            <div class="form-group">
              <label for="register-phone">Teléfono (opcional)</label>
              <input type="tel" id="register-phone" name="phone">
            </div>
          </div>
          <div class="form-group">
            <div id="register-recaptcha-container" class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
            <div id="register-recaptcha-error" class="error-message" style="display: none;">
              Por favor, completa la verificación reCAPTCHA
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-full">
            <i class="fas fa-user-plus"></i>
            Crear Cuenta
          </button>
        </form>
        <div class="auth-footer">
          <p>¿Ya tienes cuenta? <a href="#" id="show-login">Inicia sesión aquí</a></p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.registerModal = modal;
    this.setupRegisterForm();
  }

  private setupAuthButtons(): void {
    // Add auth buttons to navigation
    const navActions = DOMUtils.querySelector('.nav-actions');
    if (navActions) {
      const authButtons = DOMUtils.createElement('div', {
        className: 'auth-buttons'
      });

      authButtons.innerHTML = `
        <div id="auth-guest" class="auth-guest">
          <button id="login-btn" class="btn btn-secondary">
            <i class="fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </button>
          <button id="register-btn" class="btn btn-primary">
            <i class="fas fa-user-plus"></i>
            Registrarse
          </button>
        </div>
        <div id="auth-user" class="auth-user" style="display: none;">
          <div class="user-menu">
            <button id="user-menu-btn" class="user-menu-btn">
              <i class="fas fa-user-circle"></i>
              <span id="user-name"></span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" id="profile-btn">
                <i class="fas fa-user"></i>
                Mi Perfil
              </a>
              <a href="#" id="orders-btn">
                <i class="fas fa-shopping-bag"></i>
                Mis Compras
              </a>
              <a href="#" id="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      `;

      navActions.insertBefore(authButtons, navActions.firstChild);
      this.setupAuthButtonEvents();
    }
  }

  private setupAuthButtonEvents(): void {
    // Login button
    const loginBtn = DOMUtils.querySelector('#login-btn');
    loginBtn?.addEventListener('click', () => this.showLoginModal());

    // Register button
    const registerBtn = DOMUtils.querySelector('#register-btn');
    registerBtn?.addEventListener('click', () => this.showRegisterModal());

    // User menu
    const userMenuBtn = DOMUtils.querySelector('#user-menu-btn');
    const userDropdown = DOMUtils.querySelector('#user-dropdown');
    
    userMenuBtn?.addEventListener('click', () => {
      userDropdown?.classList.toggle('active');
    });

    // Profile button
    const profileBtn = DOMUtils.querySelector('#profile-btn');
    profileBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showProfileModal();
    });

    // Orders button
    const ordersBtn = DOMUtils.querySelector('#orders-btn');
    ordersBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showOrdersModal();
    });

    // Logout button
    const logoutBtn = DOMUtils.querySelector('#logout-btn');
    logoutBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.logout();
    });

    // Switch between modals
    const showRegister = DOMUtils.querySelector('#show-register');
    showRegister?.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideLoginModal();
      this.showRegisterModal();
    });

    const showLogin = DOMUtils.querySelector('#show-login');
    showLogin?.addEventListener('click', (e) => {
      e.preventDefault();
      this.hideRegisterModal();
      this.showLoginModal();
    });

    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!userMenuBtn?.contains(target) && !userDropdown?.contains(target)) {
        userDropdown?.classList.remove('active');
      }
    });
  }

  private setupLoginForm(): void {
    const form = DOMUtils.querySelector<HTMLFormElement>('#login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleLogin();
    });

    // Setup modal close events
    this.setupModalCloseEvents(this.loginModal);
  }

  private setupRegisterForm(): void {
    const form = DOMUtils.querySelector<HTMLFormElement>('#register-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleRegister();
    });

    // Setup modal close events
    this.setupModalCloseEvents(this.registerModal);
  }

  private setupModalCloseEvents(modal: HTMLElement | null): void {
    if (!modal) return;

    const closeBtn = modal.querySelector('.auth-modal-close');
    closeBtn?.addEventListener('click', () => this.hideAllModals());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.hideAllModals();
    });
  }

  private async handleLogin(): Promise<void> {
    const form = DOMUtils.querySelector<HTMLFormElement>('#login-form');
    if (!form) return;

    // Validate reCAPTCHA
    const recaptchaResponse = this.validateRecaptcha('login-recaptcha-error');
    if (!recaptchaResponse.isValid) {
      this.notificationManager.show({
        message: recaptchaResponse.message,
        type: 'error'
      });
      return;
    }

    const formData = this.getLoginFormData();
    const validation = this.validateLoginForm(formData);

    if (!validation.isValid) {
      this.notificationManager.show({
        message: validation.message,
        type: 'error'
      });
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.innerHTML;

    try {
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
      submitButton.disabled = true;

      // Simulate login
      const user = await this.authenticateUser(formData.email, formData.password);
      
      if (user) {
        this.setCurrentUser(user);
        this.hideAllModals();
        this.notificationManager.show({
          message: `¡Bienvenido de vuelta, ${user.firstName}!`,
          type: 'success'
        });
      } else {
        this.notificationManager.show({
          message: 'Email o contraseña incorrectos.',
          type: 'error'
        });
      }

    } catch (error) {
      this.notificationManager.show({
        message: 'Error al iniciar sesión. Intenta nuevamente.',
        type: 'error'
      });
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  private async handleRegister(): Promise<void> {
    const form = DOMUtils.querySelector<HTMLFormElement>('#register-form');
    if (!form) return;

    // Validate reCAPTCHA
    const recaptchaResponse = this.validateRecaptcha('register-recaptcha-error');
    if (!recaptchaResponse.isValid) {
      this.notificationManager.show({
        message: recaptchaResponse.message,
        type: 'error'
      });
      return;
    }

    const formData = this.getRegisterFormData();
    const validation = this.validateRegisterForm(formData);

    if (!validation.isValid) {
      this.notificationManager.show({
        message: validation.message,
        type: 'error'
      });
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.innerHTML;

    try {
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';
      submitButton.disabled = true;

      // Check if user already exists
      const existingUser = this.getUserByEmail(formData.email);
      if (existingUser) {
        this.notificationManager.show({
          message: 'Ya existe una cuenta con este email.',
          type: 'error'
        });
        return;
      }

      // Create new user
      const newUser = await this.createUser(formData);
      this.setCurrentUser(newUser);
      this.hideAllModals();
      
      this.notificationManager.show({
        message: `¡Cuenta creada exitosamente! Bienvenido, ${newUser.firstName}!`,
        type: 'success'
      });

    } catch (error) {
      this.notificationManager.show({
        message: 'Error al crear la cuenta. Intenta nuevamente.',
        type: 'error'
      });
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  private validateRecaptcha(errorElementId: string): { isValid: boolean; message: string } {
    if (!window.grecaptcha) {
      return { isValid: false, message: 'reCAPTCHA no está disponible. Por favor, recarga la página.' };
    }

    const recaptchaResponse = window.grecaptcha.getResponse();
    
    if (!recaptchaResponse) {
      this.showRecaptchaError(errorElementId);
      return { isValid: false, message: 'Por favor, completa la verificación reCAPTCHA.' };
    }

    this.hideRecaptchaError(errorElementId);
    return { isValid: true, message: '' };
  }

  private showRecaptchaError(errorElementId: string): void {
    const errorElement = DOMUtils.querySelector(`#${errorElementId}`);
    if (errorElement) {
      errorElement.style.display = 'block';
    }
  }

  private hideRecaptchaError(errorElementId: string): void {
    const errorElement = DOMUtils.querySelector(`#${errorElementId}`);
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  private getLoginFormData(): LoginFormData {
    const form = DOMUtils.querySelector<HTMLFormElement>('#login-form');
    if (!form) throw new Error('Login form not found');

    const formData = new FormData(form);
    return {
      email: formData.get('email') as string || '',
      password: formData.get('password') as string || ''
    };
  }

  private getRegisterFormData(): RegisterFormData {
    const form = DOMUtils.querySelector<HTMLFormElement>('#register-form');
    if (!form) throw new Error('Register form not found');

    const formData = new FormData(form);
    return {
      firstName: formData.get('firstName') as string || '',
      lastName: formData.get('lastName') as string || '',
      email: formData.get('email') as string || '',
      password: formData.get('password') as string || '',
      confirmPassword: formData.get('confirmPassword') as string || '',
      company: formData.get('company') as string || '',
      phone: formData.get('phone') as string || ''
    };
  }

  private validateLoginForm(data: LoginFormData): { isValid: boolean; message: string } {
    if (!ValidationUtils.isRequired(data.email)) {
      return { isValid: false, message: 'El email es requerido.' };
    }

    if (!ValidationUtils.isValidEmail(data.email)) {
      return { isValid: false, message: 'Por favor, ingresa un email válido.' };
    }

    if (!ValidationUtils.isRequired(data.password)) {
      return { isValid: false, message: 'La contraseña es requerida.' };
    }

    return { isValid: true, message: '' };
  }

  private validateRegisterForm(data: RegisterFormData): { isValid: boolean; message: string } {
    if (!ValidationUtils.isRequired(data.firstName)) {
      return { isValid: false, message: 'El nombre es requerido.' };
    }

    if (!ValidationUtils.isRequired(data.lastName)) {
      return { isValid: false, message: 'El apellido es requerido.' };
    }

    if (!ValidationUtils.isRequired(data.email)) {
      return { isValid: false, message: 'El email es requerido.' };
    }

    if (!ValidationUtils.isValidEmail(data.email)) {
      return { isValid: false, message: 'Por favor, ingresa un email válido.' };
    }

    if (!ValidationUtils.isRequired(data.password)) {
      return { isValid: false, message: 'La contraseña es requerida.' };
    }

    if (!ValidationUtils.minLength(data.password, 6)) {
      return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    if (data.password !== data.confirmPassword) {
      return { isValid: false, message: 'Las contraseñas no coinciden.' };
    }

    return { isValid: true, message: '' };
  }

  private async authenticateUser(email: string, password: string): Promise<User | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);
    
    if (user) {
      // In a real app, you'd hash and compare passwords
      // For demo purposes, we'll just check if password is not empty
      if (password.length > 0) {
        user.lastLogin = new Date().toISOString();
        this.updateUser(user);
        return user;
      }
    }

    return null;
  }

  private async createUser(data: RegisterFormData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser: User = {
      id: this.generateUserId(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      phone: data.phone,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    this.saveUser(newUser);
    return newUser;
  }

  private generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private getAllUsers(): User[] {
    return StorageUtils.getItem<User[]>('users') || [];
  }

  private getUserByEmail(email: string): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.email === email) || null;
  }

  private saveUser(user: User): void {
    const users = this.getAllUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    StorageUtils.setItem('users', users);
  }

  private updateUser(user: User): void {
    this.saveUser(user);
    if (this.currentUser?.id === user.id) {
      this.currentUser = user;
      StorageUtils.setItem('currentUser', user);
    }
  }

  private setCurrentUser(user: User): void {
    this.currentUser = user;
    StorageUtils.setItem('currentUser', user);
    this.updateAuthUI();
  }

  private loadCurrentUser(): void {
    const savedUser = StorageUtils.getItem<User>('currentUser');
    if (savedUser) {
      this.currentUser = savedUser;
    }
  }

  private updateAuthUI(): void {
    const guestElements = DOMUtils.querySelector('#auth-guest');
    const userElements = DOMUtils.querySelector('#auth-user');
    const userName = DOMUtils.querySelector('#user-name');

    if (this.currentUser) {
      guestElements?.style.setProperty('display', 'none');
      userElements?.style.setProperty('display', 'block');
      if (userName) {
        userName.textContent = this.currentUser.firstName;
      }
    } else {
      guestElements?.style.setProperty('display', 'flex');
      userElements?.style.setProperty('display', 'none');
    }
  }

  private showLoginModal(): void {
    this.hideAllModals();
    if (this.loginModal) {
      this.loginModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Render reCAPTCHA if needed
      setTimeout(() => {
        if (window.grecaptcha) {
          window.grecaptcha.render('login-recaptcha-container');
        }
      }, 100);
    }
  }

  private showRegisterModal(): void {
    this.hideAllModals();
    if (this.registerModal) {
      this.registerModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Render reCAPTCHA if needed
      setTimeout(() => {
        if (window.grecaptcha) {
          window.grecaptcha.render('register-recaptcha-container');
        }
      }, 100);
    }
  }

  private hideLoginModal(): void {
    if (this.loginModal) {
      this.loginModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  private hideRegisterModal(): void {
    if (this.registerModal) {
      this.registerModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  private hideAllModals(): void {
    this.hideLoginModal();
    this.hideRegisterModal();
    document.body.style.overflow = '';
  }

  private showProfileModal(): void {
    // This will be implemented by ProfileManager
    const event = new CustomEvent('showProfile');
    document.dispatchEvent(event);
  }

  private showOrdersModal(): void {
    // This will be implemented by OrderManager
    const event = new CustomEvent('showOrders');
    document.dispatchEvent(event);
  }

  private logout(): void {
    this.currentUser = null;
    StorageUtils.removeItem('currentUser');
    this.updateAuthUI();
    
    this.notificationManager.show({
      message: 'Sesión cerrada exitosamente.',
      type: 'success'
    });
  }

  // Public methods
  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public requireAuth(): boolean {
    if (!this.isAuthenticated()) {
      this.showLoginModal();
      this.notificationManager.show({
        message: 'Debes iniciar sesión para continuar.',
        type: 'info'
      });
      return false;
    }
    return true;
  }
}