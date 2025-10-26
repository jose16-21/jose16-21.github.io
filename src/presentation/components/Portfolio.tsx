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
    <section className="py-24 bg-white" id="portafolio">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">Algunos de los proyectos más relevantes en mi carrera</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-2xl shadow-lg border border-gray-lighter overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl hover:border-primary group" 
              data-aos="fade-up" 
              data-aos-delay={project.delay}
            >
              <div className="relative h-64 bg-gradient-primary flex items-center justify-center overflow-hidden">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <i className={`fas ${project.icon} text-6xl text-white`}></i>
                </div>
                <div className="absolute inset-0 bg-dark/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <i className="fas fa-external-link-alt text-xl"></i>
                  </a>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-dark mb-4">{project.title}</h3>
                <p className="text-gray-medium mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-lighter text-primary text-sm font-medium rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-all">{tech}</span>
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
