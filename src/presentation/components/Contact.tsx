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
    <section className="py-24 bg-white" id="contacto">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">¿Listo para Trabajar Juntos?</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">Conversemos sobre tu próximo proyecto tecnológico</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <div className="space-y-8" data-aos="fade-up">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${item.icon} text-xl text-white`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-dark mb-1">{item.title}</h4>
                  {(item.title === 'Email' || item.title === 'Teléfono') ? (
                    <div className="flex items-center gap-2 relative group">
                      <p className="text-gray-medium m-0 cursor-pointer transition-colors hover:text-primary">{item.value}</p>
                      <button
                        className="bg-primary text-white border-none rounded-md p-2 cursor-pointer transition-all flex items-center justify-center w-8 h-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-secondary hover:scale-110 active:scale-95"
                        onClick={() => copyToClipboard(item.value, item.title)}
                        title={`Copiar ${item.title.toLowerCase()}`}
                      >
                        {copiedField === item.title ? (
                          <i className="fas fa-check text-sm"></i>
                        ) : (
                          <i className="fas fa-copy text-sm"></i>
                        )}
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-medium m-0">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-lighter p-8 rounded-2xl" data-aos="fade-up" data-aos-delay={100}>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label htmlFor="nombre" className="block mb-2 font-semibold text-dark">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 border-2 border-gray-light rounded-lg text-base transition-all bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-semibold text-dark">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 border-2 border-gray-light rounded-lg text-base transition-all bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label htmlFor="empresa" className="block mb-2 font-semibold text-dark">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border-2 border-gray-light rounded-lg text-base transition-all bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="presupuesto" className="block mb-2 font-semibold text-dark">Presupuesto estimado</label>
                  <select
                    id="presupuesto"
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border-2 border-gray-light rounded-lg text-base transition-all bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  >
                    <option value="">Seleccionar rango</option>
                    <option value="500-2000">$500 - $2,000 USD</option>
                    <option value="2000-5000">$2,000 - $5,000 USD</option>
                    <option value="5000-10000">$5,000 - $10,000 USD</option>
                    <option value="10000+">$10,000+ USD</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="servicio" className="block mb-2 font-semibold text-dark">Servicio de interés</label>
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border-2 border-gray-light rounded-lg text-base transition-all bg-white focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
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
              <div className="mb-4">
                <label htmlFor="mensaje" className="block mb-2 font-semibold text-dark">Describe tu proyecto</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntame sobre tu proyecto, objetivos y timeline esperado..."
                  className="w-full px-3 py-3 border-2 border-gray-light rounded-lg text-base transition-all bg-white resize-y min-h-[120px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                ></textarea>
              </div>
              <div className="mb-4">
                <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
                {recaptchaError && (
                  <div id="recaptcha-error" className="text-error text-sm mt-2 flex items-center gap-2 before:content-['⚠️'] before:text-base">
                    Por favor, completa la verificación reCAPTCHA
                  </div>
                )}
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
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
