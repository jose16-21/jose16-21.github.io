import { DOMUtils, ValidationUtils } from '../utils';
import { NotificationManager } from './NotificationManager';
import type { ContactFormData } from '../types';

export class ContactForm {
  private form: HTMLFormElement | null;
  private notificationManager: NotificationManager;

  constructor() {
    this.form = DOMUtils.querySelector<HTMLFormElement>('#contactForm');
    this.notificationManager = new NotificationManager();
    
    this.init();
  }

  private init(): void {
    if (!this.form) return;
    
    this.setupFormSubmission();
    this.setupFieldEnhancements();
  }

  private setupFormSubmission(): void {
    if (!this.form) return;

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit();
    });
  }

  private async handleSubmit(): Promise<void> {
    if (!this.form) return;

    // Validate reCAPTCHA
    const recaptchaResponse = this.validateRecaptcha();
    if (!recaptchaResponse.isValid) {
      this.notificationManager.show({
        message: recaptchaResponse.message,
        type: 'error'
      });
      return;
    }

    const formData = this.getFormData();
    const validation = this.validateForm(formData);

    if (!validation.isValid) {
      this.notificationManager.show({
        message: validation.message,
        type: 'error'
      });
      return;
    }

    const submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (!submitButton) return;

    const originalText = submitButton.innerHTML;
    
    try {
      // Disable button and show loading state
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitButton.disabled = true;

      // Simulate API call
      await this.simulateSubmission(formData);

      this.notificationManager.show({
        message: '¡Mensaje enviado exitosamente! Me pondré en contacto contigo pronto.',
        type: 'success'
      });

      this.form.reset();
      this.resetFieldStates();
      
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }

    } catch (error) {
      this.notificationManager.show({
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
        type: 'error'
      });
    } finally {
      // Restore button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  private getFormData(): ContactFormData {
    if (!this.form) {
      throw new Error('Form not found');
    }

    const formData = new FormData(this.form);
    
    return {
      nombre: formData.get('nombre') as string || '',
      email: formData.get('email') as string || '',
      empresa: formData.get('empresa') as string || '',
      presupuesto: formData.get('presupuesto') as string || '',
      servicio: formData.get('servicio') as string || '',
      mensaje: formData.get('mensaje') as string || ''
    };
  }

  private validateRecaptcha(): { isValid: boolean; message: string } {
    if (!window.grecaptcha) {
      return { isValid: false, message: 'reCAPTCHA no está disponible. Por favor, recarga la página.' };
    }

    const recaptchaResponse = window.grecaptcha.getResponse();
    
    if (!recaptchaResponse) {
      this.showRecaptchaError();
      return { isValid: false, message: 'Por favor, completa la verificación reCAPTCHA.' };
    }

    this.hideRecaptchaError();
    return { isValid: true, message: '' };
  }

  private showRecaptchaError(): void {
    const errorElement = DOMUtils.querySelector('#recaptcha-error');
    if (errorElement) {
      errorElement.style.display = 'block';
    }

    const recaptchaContainer = DOMUtils.querySelector('.g-recaptcha');
    if (recaptchaContainer) {
      recaptchaContainer.style.border = '2px solid #ef4444';
      recaptchaContainer.style.borderRadius = '4px';
    }
  }

  private hideRecaptchaError(): void {
    const errorElement = DOMUtils.querySelector('#recaptcha-error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }

    const recaptchaContainer = DOMUtils.querySelector('.g-recaptcha');
    if (recaptchaContainer) {
      recaptchaContainer.style.border = 'none';
    }
  }

  private validateForm(data: ContactFormData): { isValid: boolean; message: string } {
    if (!ValidationUtils.isRequired(data.nombre)) {
      return { isValid: false, message: 'El nombre es requerido.' };
    }

    if (!ValidationUtils.isRequired(data.email)) {
      return { isValid: false, message: 'El email es requerido.' };
    }

    if (!ValidationUtils.isValidEmail(data.email)) {
      return { isValid: false, message: 'Por favor, ingresa un email válido.' };
    }

    if (!ValidationUtils.isRequired(data.servicio)) {
      return { isValid: false, message: 'Por favor, selecciona un servicio.' };
    }

    if (!ValidationUtils.isRequired(data.mensaje)) {
      return { isValid: false, message: 'El mensaje es requerido.' };
    }

    if (!ValidationUtils.minLength(data.mensaje, 10)) {
      return { isValid: false, message: 'El mensaje debe tener al menos 10 caracteres.' };
    }

    return { isValid: true, message: '' };
  }

  private async simulateSubmission(data: ContactFormData): Promise<void> {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted with data:', data);
        resolve();
      }, 2000);
    });
  }

  private setupFieldEnhancements(): void {
    const formInputs = DOMUtils.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea'
    );

    formInputs.forEach(input => {
      // Add floating labels effect
      input.addEventListener('focus', () => {
        input.parentElement?.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement?.classList.remove('focused');
        }
      });

      // Check if field has value on load
      if (input.value) {
        input.parentElement?.classList.add('focused');
      }
    });
  }

  private resetFieldStates(): void {
    const formGroups = DOMUtils.querySelectorAll<HTMLElement>('.form-group');
    formGroups.forEach(group => {
      group.classList.remove('focused');
    });
    
    this.hideRecaptchaError();
  }
}