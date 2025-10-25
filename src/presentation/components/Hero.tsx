import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-highlight">Juan José Hernández</span>
              <br />Consultor en Desarrollo y Tecnología
            </h1>
            <p className="hero-description">
              Especialista en desarrollo de software, arquitectura de sistemas y consultoría tecnológica. 
              Transformo ideas en soluciones digitales robustas y escalables.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Años de Experiencia</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Proyectos Completados</span>
              </div>
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Tecnologías Dominadas</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="#contacto" className="btn btn-primary">
                <i className="fas fa-paper-plane"></i>
                Contratar Servicios
              </a>
              <a href="#portafolio" className="btn btn-secondary">
                <i className="fas fa-eye"></i>
                Ver Portafolio
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="card-content">
                <div className="profile-image">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h3>Juan José Hernández</h3>
                <p>Senior Developer & Tech Consultant</p>
                <div className="social-links">
                  <a href="mailto:ju16jo@gmail.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-envelope"></i></a>
                  <a href="https://www.linkedin.com/in/juan-jose-hernandez-gt/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                  <a href="https://github.com/jose16-21" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </section>
  );
};

export default Hero;
