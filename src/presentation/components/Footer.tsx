import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardUtils } from '../../utils';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    const success = await ClipboardUtils.copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const footerSections = [
    {
      titleKey: 'footer.services',
      links: [
        { textKey: 'footer.links.webDev', href: '#servicios' },
        { textKey: 'footer.links.mobileApps', href: '#servicios' },
        { textKey: 'footer.links.consulting', href: '#servicios' },
        { textKey: 'footer.links.database', href: '#servicios' }
      ]
    },
    {
      titleKey: 'footer.technologies',
      links: [
        { textKey: 'footer.links.reactAngular', href: '#tecnologias' },
        { textKey: 'footer.links.nodePython', href: '#tecnologias' },
        { textKey: 'footer.links.awsCloud', href: '#tecnologias' },
        { textKey: 'footer.links.databases', href: '#tecnologias' }
      ]
    },
    {
      titleKey: 'footer.contact',
      links: [
        { icon: 'fas fa-envelope', text: 'ju16jo@gmail.com', href: 'mailto:ju16jo@gmail.com', copyable: true },
        { icon: 'fas fa-phone', text: '+502 3132-2197', href: 'tel:+50231322197', copyable: true },
        { icon: 'fas fa-map-marker-alt', text: 'Guatemala', href: '#', copyable: false }
      ]
    }
  ];

  return (
    <footer className="bg-primary text-white py-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 mb-8">
          <div>
            <h3 className="text-white mb-4 text-xl font-bold">Juan José Hernández</h3>
            <p className="text-gray-light mb-4 font-light leading-relaxed">{t('footer.description')}</p>
            <div className="flex gap-4 mt-4">
              <a href="mailto:ju16jo@gmail.com" aria-label="Email" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center transition-all hover:bg-secondary hover:text-white">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://www.linkedin.com/in/juan-jose-hernandez-gt/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center transition-all hover:bg-secondary hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/jose16-21" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center transition-all hover:bg-secondary hover:text-white">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4 className="text-white mb-4 font-semibold">{t(section.titleKey)}</h4>
              <ul className="list-none">
                {section.links.map((link, index) => (
                  <li key={index} className="mb-2">
                    {'icon' in link ? (
                      <div className="flex items-center gap-2 justify-between group">
                        <span className="cursor-pointer transition-colors hover:text-secondary font-light">
                          <i className={link.icon}></i> {link.text}
                        </span>
                        {link.copyable && (
                          <button
                            className="bg-primary-light text-gray-light border-none rounded px-2 py-1 cursor-pointer transition-all flex items-center justify-center w-7 h-7 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-secondary hover:text-white active:scale-95"
                            onClick={() => copyToClipboard(link.text, `${section.titleKey}-${index}`)}
                            title={`${t('common.copied').replace('!', '')} ${link.text}`}
                          >
                            {copiedField === `${section.titleKey}-${index}` ? (
                              <i className="fas fa-check text-xs"></i>
                            ) : (
                              <i className="fas fa-copy text-xs"></i>
                            )}
                          </button>
                        )}
                      </div>
                    ) : (
                      <a href={link.href} className="text-gray-light no-underline transition-colors hover:text-secondary font-light">{t((link as { textKey: string }).textKey)}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-light pt-8 text-center">
          <p className="text-gray-light m-0 font-light">&copy; 2024 Juan José Hernández. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
