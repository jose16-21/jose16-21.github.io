import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden pt-20 lg:pt-0" id="inicio">
      
      {/* Fondo minimalista con formas geométricas sutiles - Usando colores del branding */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos de fondo sutiles con colores del branding */}
        <div className="absolute top-20 right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-[25%] w-[300px] h-[300px] bg-gradient-to-br from-secondary/15 to-accent/15 rounded-full blur-3xl"></div>
        
        {/* Puntos decorativos con colores del branding */}
        <div className="absolute top-1/4 right-[10%] w-2 h-2 bg-primary/30 rounded-full"></div>
        <div className="absolute top-1/3 right-[20%] w-3 h-3 bg-secondary/30 rounded-full"></div>
        <div className="absolute bottom-1/3 right-[15%] w-2 h-2 bg-accent/30 rounded-full"></div>
      </div>

      {/* Contenido Principal - Centrado */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Título principal con gradiente del branding */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Juan José Hernández
        </h1>
        
        {/* Subtítulo */}
        <h2 className="text-2xl md:text-3xl font-light text-gray-dark mb-6">
          Software Engineer & Tech Consultant
        </h2>

        {/* Badge de disponibilidad */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Disponible para proyectos
          </div>
        </div>

        {/* Descripción */}
        <p className="text-lg text-gray-medium leading-relaxed mb-8 max-w-2xl mx-auto">
          Especialista en desarrollo de software, arquitectura de sistemas y consultoría tecnológica. 
          Transformo ideas en <span className="font-semibold text-primary">soluciones digitales robustas y escalables</span>.
        </p>

        {/* Redes sociales */}
        <div className="flex justify-center gap-4 mb-8">
          <a 
            href="mailto:ju16jo@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-lighter rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-gray-medium"
          >
            <i className="fas fa-envelope"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/juan-jose-hernandez-gt/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-lighter rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-gray-medium"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href="https://github.com/jose16-21" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-lighter rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-gray-medium"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* Botones CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#contacto" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fas fa-paper-plane"></i>
            Contratar Servicios
          </a>
          <a 
            href="#portafolio" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <i className="fas fa-eye"></i>
            Ver Portafolio
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors cursor-pointer">
          <span className="text-sm font-medium">Scroll</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;
