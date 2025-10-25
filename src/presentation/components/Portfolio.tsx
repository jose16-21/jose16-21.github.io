import React from 'react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plataforma completa de comercio electrónico con React, Node.js y PostgreSQL. Incluye panel administrativo, pasarela de pagos y sistema de inventarios.',
      icon: 'fa-shopping-cart',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      delay: 0
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Aplicación móvil multiplataforma para gestión de tareas con sincronización en tiempo real, notificaciones push y colaboración en equipo.',
      icon: 'fa-mobile-alt',
      technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
      delay: 100
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Dashboard empresarial con visualizaciones interactivas, reportes automáticos y integración con múltiples fuentes de datos.',
      icon: 'fa-chart-line',
      technologies: ['Vue.js', 'D3.js', 'Python', 'MongoDB'],
      delay: 200
    },
    {
      id: 4,
      title: 'Cloud Migration Project',
      description: 'Migración completa de infraestructura legacy a AWS con arquitectura de microservicios, CI/CD y monitoreo avanzado.',
      icon: 'fa-cloud',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      delay: 300
    }
  ];

  return (
    <section className="portfolio" id="portafolio">
      <div className="container">
        <div className="section-header">
          <h2>Proyectos Destacados</h2>
          <p>Algunos de los proyectos más relevantes en mi carrera</p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="portfolio-item" 
              data-aos="fade-up" 
              data-aos-delay={project.delay}
            >
              <div className="portfolio-image">
                <div className="portfolio-placeholder">
                  <i className={`fas ${project.icon}`}></i>
                </div>
                <div className="portfolio-overlay">
                  <a href="#" className="portfolio-link">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
