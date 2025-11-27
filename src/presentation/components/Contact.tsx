import React, { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardUtils } from '../../utils';

const Contact: React.FC = () => {
  const { t } = useTranslation();
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
    alert(t('contact.form.success'));
    
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
      titleKey: 'contact.info.email',
      value: 'ju16jo@gmail.com'
    },
    {
      icon: 'fa-phone',
      titleKey: 'contact.info.phone',
      value: '+502 3132-2197'
    },
    {
      icon: 'fa-map-marker-alt',
      titleKey: 'contact.info.location',
      value: 'Guatemala'
    },
    {
      icon: 'fa-clock',
      titleKey: 'contact.info.availability',
      valueKey: 'contact.info.schedule'
    }
  ];

  return (
    <section className="py-24 bg-white" id="contacto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t('contact.title')}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">{t('contact.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
          <div className="space-y-6" data-aos="fade-up">
            {contactInfo.map((item) => (
              <div key={item.titleKey} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fas ${item.icon} text-sm text-white`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">{t(item.titleKey)}</h4>
                  {(item.titleKey === 'contact.info.email' || item.titleKey === 'contact.info.phone') ? (
                    <div className="flex items-center gap-2 relative group">
                      <p className="text-sm text-gray-600 m-0 cursor-pointer transition-colors hover:text-primary">{item.value}</p>
                      <button
                        className="bg-primary text-white border-none rounded p-1.5 cursor-pointer transition-all flex items-center justify-center w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-secondary hover:scale-110 active:scale-95"
                        onClick={() => copyToClipboard(item.value!, item.titleKey)}
                        title={`${t('common.copied').replace('!', '')} ${t(item.titleKey).toLowerCase()}`}
                      >
                        {copiedField === item.titleKey ? (
                          <i className="fas fa-check text-xs"></i>
                        ) : (
                          <i className="fas fa-copy text-xs"></i>
                        )}
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 m-0">{item.valueKey ? t(item.valueKey) : item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100" data-aos="fade-up" data-aos-delay={100}>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="nombre" className="block mb-1.5 text-sm font-medium text-gray-700">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empresa" className="block mb-1.5 text-sm font-medium text-gray-700">{t('contact.form.company')}</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label htmlFor="presupuesto" className="block mb-1.5 text-sm font-medium text-gray-700">{t('contact.form.budget')}</label>
                  <select
                    id="presupuesto"
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="">{t('contact.form.budgetPlaceholder')}</option>
                    <option value="500-2000">$500 - $2,000 USD</option>
                    <option value="2000-5000">$2,000 - $5,000 USD</option>
                    <option value="5000-10000">$5,000 - $10,000 USD</option>
                    <option value="10000+">$10,000+ USD</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="servicio" className="block mb-1.5 text-sm font-medium text-gray-700">{t('contact.form.service')}</label>
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="">{t('contact.form.servicePlaceholder')}</option>
                  <option value="web">{t('contact.serviceOptions.web')}</option>
                  <option value="mobile">{t('contact.serviceOptions.mobile')}</option>
                  <option value="consultoria">{t('contact.serviceOptions.consulting')}</option>
                  <option value="database">{t('contact.serviceOptions.database')}</option>
                  <option value="devops">{t('contact.serviceOptions.devops')}</option>
                  <option value="capacitacion">{t('contact.serviceOptions.training')}</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="mensaje" className="block mb-1.5 text-sm font-medium text-gray-700">{t('contact.form.message')}</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm transition-all bg-white resize-y min-h-[100px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                ></textarea>
              </div>
              <div className="mb-4">
                <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
                {recaptchaError && (
                  <div id="recaptcha-error" className="text-error text-xs mt-1.5 flex items-center gap-1.5 before:content-['⚠️'] before:text-sm">
                    {t('contact.form.recaptchaError')}
                  </div>
                )}
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-primary text-white text-sm font-medium rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                <i className="fas fa-paper-plane text-xs"></i>
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
