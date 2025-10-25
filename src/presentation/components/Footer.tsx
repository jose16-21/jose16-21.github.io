import React from 'react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Servicios',
      links: [
        { text: 'Desarrollo Web', href: '#servicios' },
        { text: 'Apps Móviles', href: '#servicios' },
        { text: 'Consultoría', href: '#servicios' },
        { text: 'Base de Datos', href: '#servicios' }
      ]
    },
    {
      title: 'Tecnologías',
      links: [
        { text: 'React & Angular', href: '#tecnologias' },
        { text: 'Node.js & Python', href: '#tecnologias' },
        { text: 'AWS & Cloud', href: '#tecnologias' },
        { text: 'Bases de Datos', href: '#tecnologias' }
      ]
    },
    {
      title: 'Contacto',
      links: [
        { icon: 'fas fa-envelope', text: 'ju16jo@gmail.com', href: 'mailto:ju16jo@gmail.com' },
        { icon: 'fas fa-phone', text: '+502 3132-2197', href: 'tel:+50231322197' },
        { icon: 'fas fa-map-marker-alt', text: 'Guatemala', href: '#' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Juan José Hernández</h3>
            <p>Consultor especializado en desarrollo tecnológico y transformación digital. Convirtiendo ideas innovadoras en soluciones tecnológicas exitosas.</p>
            <div className="social-links">
              <a href="mailto:ju16jo@gmail.com" aria-label="Email" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://www.linkedin.com/in/juan-jose-hernandez-gt/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/jose16-21" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, index) => (
                  <li key={index}>
                    {'icon' in link ? (
                      <><i className={link.icon}></i> {link.text}</>
                    ) : (
                      <a href={link.href}>{link.text}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Juan José Hernández. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
