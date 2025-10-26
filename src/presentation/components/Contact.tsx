import React, { useState, FormEvent } from 'react';
import { ClipboardUtils } from '../../utils';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    presupuesto: '',
    servicio: '',
    mensaje: ''
  });

  const [recaptchaError, setRecaptchaError] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    const success = await ClipboardUtils.copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar reCAPTCHA
    if (window.grecaptcha) {
      const response = window.grecaptcha.getResponse();
      if (!response) {
        setRecaptchaError(true);
        return;
      }
      setRecaptchaError(false);
    }

    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
    alert('Formulario enviado correctamente. Te contactaremos pronto.');
    
    // Reset form
    setFormData({
      nombre: '',
      email: '',
      empresa: '',
      presupuesto: '',
      servicio: '',
      mensaje: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: 'fa-envelope',
      title: 'Email',
      value: 'ju16jo@gmail.com'
    },
    {
      icon: 'fa-phone',
      title: 'Teléfono',
      value: '+502 3132-2197'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Ubicación',
      value: 'Guatemala'
    },
    {
      icon: 'fa-clock',
      title: 'Disponibilidad',
      value: 'Lun - Vie, 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <section className="contact" id="contacto">
      <div className="container">
        <div className="section-header">
          <h2>¿Listo para Trabajar Juntos?</h2>
          <p>Conversemos sobre tu próximo proyecto tecnológico</p>
        </div>
        <div className="contact-content">
          <div className="contact-info" data-aos="fade-up">
            {contactInfo.map((item) => (
              <div key={item.title} className="contact-item">
                <div className="contact-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <div className="contact-details">
                  <h4>{item.title}</h4>
                  {(item.title === 'Email' || item.title === 'Teléfono') ? (
                    <div className="copyable-field">
                      <p>{item.value}</p>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(item.value, item.title)}
                        title={`Copiar ${item.title.toLowerCase()}`}
                      >
                        {copiedField === item.title ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-copy"></i>
                        )}
                      </button>
                    </div>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-container" data-aos="fade-up" data-aos-delay={100}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="presupuesto">Presupuesto estimado</label>
                  <select
                    id="presupuesto"
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar rango</option>
                    <option value="500-2000">$500 - $2,000 USD</option>
                    <option value="2000-5000">$2,000 - $5,000 USD</option>
                    <option value="5000-10000">$5,000 - $10,000 USD</option>
                    <option value="10000+">$10,000+ USD</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="servicio">Servicio de interés</label>
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar servicio</option>
                  <option value="web">Desarrollo Web Full-Stack</option>
                  <option value="mobile">Desarrollo de Apps Móviles</option>
                  <option value="consultoria">Consultoría y Arquitectura</option>
                  <option value="database">Sistemas de Base de Datos</option>
                  <option value="devops">Seguridad y DevOps</option>
                  <option value="capacitacion">Capacitación Técnica</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mensaje">Describe tu proyecto</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntame sobre tu proyecto, objetivos y timeline esperado..."
                ></textarea>
              </div>
              <div className="form-group">
                <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
                {recaptchaError && (
                  <div id="recaptcha-error" className="error-message">
                    Por favor, completa la verificación reCAPTCHA
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <i className="fas fa-paper-plane"></i>
                Enviar Propuesta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
