import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden" id="inicio">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Juan José Hernández</span>
              <br />
              <span className="text-dark">Consultor en Desarrollo y Tecnología</span>
            </h1>
            <p className="text-xl text-gray-medium max-w-2xl">
              Especialista en desarrollo de software, arquitectura de sistemas y consultoría tecnológica. 
              Transformo ideas en soluciones digitales robustas y escalables.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-primary leading-none">5+</span>
                <span className="text-sm text-gray-medium font-medium mt-1">Años de Experiencia</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-primary leading-none">50+</span>
                <span className="text-sm text-gray-medium font-medium mt-1">Proyectos Completados</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-primary leading-none">20+</span>
                <span className="text-sm text-gray-medium font-medium mt-1">Tecnologías Dominadas</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contacto" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
              >
                <i className="fas fa-paper-plane"></i>
                Contratar Servicios
              </a>
              <a 
                href="#portafolio" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                <i className="fas fa-eye"></i>
                Ver Portafolio
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl p-8 shadow-xl transform translate-y-5 animate-[float_6s_ease-in-out_infinite]">
              <div className="text-center space-y-6">
                <div className="text-6xl text-primary">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h3 className="text-2xl font-bold text-dark">Juan José Hernández</h3>
                <p className="text-gray-medium">Senior Developer & Tech Consultant</p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="mailto:ju16jo@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-lighter text-gray-medium rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/juan-jose-hernandez-gt/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-lighter text-gray-medium rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a 
                    href="https://github.com/jose16-21" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-lighter text-gray-medium rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[300px] h-[300px] top-[10%] right-[10%] bg-gradient-primary rounded-full opacity-10 animate-[float_8s_ease-in-out_-2s_infinite]"></div>
        <div className="absolute w-[200px] h-[200px] bottom-[20%] left-[10%] bg-gradient-primary rounded-full opacity-10 animate-[float_8s_ease-in-out_-4s_infinite]"></div>
        <div className="absolute w-[150px] h-[150px] top-[60%] right-[30%] bg-gradient-primary rounded-full opacity-10 animate-[float_8s_ease-in-out_-6s_infinite]"></div>
      </div>
    </section>
  );
};

export default Hero;
