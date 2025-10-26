import React from 'react';

const Experience: React.FC = () => {
  const timeline = [
    {
      id: 1,
      period: '2023 - Presente',
      title: 'Consultor Senior de Tecnología',
      company: 'Freelance / Consultoría Independiente',
      description: 'Consultoría especializada en arquitectura de sistemas, desarrollo full-stack y transformación digital para empresas medianas y grandes.',
      achievements: [
        'Asesoría en migración a la nube (+10 proyectos)',
        'Desarrollo de aplicaciones web y móviles',
        'Optimización de bases de datos y rendimiento',
        'Capacitación técnica para equipos de desarrollo'
      ],
      delay: 0
    },
    {
      id: 2,
      period: '2021 - 2023',
      title: 'Arquitecto de Software',
      company: 'TechCorp Solutions',
      description: 'Liderazgo técnico en proyectos de gran escala, definición de arquitecturas y mentoreo de equipos de desarrollo.',
      achievements: [
        'Diseño de arquitecturas de microservicios',
        'Implementación de DevOps y CI/CD',
        'Gestión de equipos técnicos (8-12 desarrolladores)',
        'Reducción de costos operacionales en 40%'
      ],
      delay: 100
    },
    {
      id: 3,
      period: '2019 - 2021',
      title: 'Desarrollador Full-Stack Senior',
      company: 'Innovate Digital',
      description: 'Desarrollo de aplicaciones web complejas y sistemas de gestión empresarial usando tecnologías modernas.',
      achievements: [
        'Desarrollo con React, Angular, Node.js',
        'Integración de APIs y servicios de terceros',
        'Optimización de rendimiento front-end y back-end',
        'Mentoría de desarrolladores junior'
      ],
      delay: 200
    },
    {
      id: 4,
      period: '2018 - 2019',
      title: 'Desarrollador Full-Stack',
      company: 'StartupTech',
      description: 'Participación en el desarrollo de productos tecnológicos desde cero, enfocado en metodologías ágiles y desarrollo rápido.',
      achievements: [
        'Desarrollo de MVP para startup tecnológica',
        'Implementación de metodologías Scrum',
        'Desarrollo móvil con React Native',
        'Integración con servicios AWS'
      ],
      delay: 300
    }
  ];

  const achievements = [
    {
      icon: 'fa-trophy',
      title: 'Certificaciones',
      description: 'AWS Solutions Architect, Scrum Master, Google Cloud Professional'
    },
    {
      icon: 'fa-star',
      title: 'Reconocimientos',
      description: 'Mejor Proyecto Tecnológico 2022, Top Performer Award'
    }
  ];

  return (
    <section className="py-24 bg-gray-lighter" id="experiencia">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Experiencia Profesional</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">Trayectoria y logros en el desarrollo tecnológico</p>
        </div>
        <div className="relative before:absolute before:left-[30px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-primary md:before:left-1/2">
          {timeline.map((item) => (
            <div 
              key={item.id} 
              className="relative flex items-start mb-12 md:mb-16" 
              data-aos="fade-up" 
              data-aos-delay={item.delay}
            >
              <div className="absolute left-[22px] w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg md:left-1/2 md:-ml-2"></div>
              <div className="ml-16 bg-white rounded-2xl p-6 shadow-lg border border-gray-lighter transition-all hover:-translate-y-2 hover:shadow-xl hover:border-primary md:ml-0 md:w-[calc(50%-60px)] md:odd:mr-auto md:even:ml-auto">
                <div className="inline-block px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold mb-4">{item.period}</div>
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-2">{item.title}</h3>
                  <h4 className="text-lg text-primary font-semibold mb-4">{item.company}</h4>
                  <p className="text-gray-medium mb-4">{item.description}</p>
                  <ul className="list-none">
                    {item.achievements.map((achievement, index) => (
                      <li key={index} className="relative pl-6 mb-2 text-gray-medium before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.title} 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-lighter transition-all hover:-translate-y-2 hover:shadow-xl hover:border-primary flex gap-6" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <i className={`fas ${achievement.icon} text-3xl text-white`}></i>
              </div>
              <div>
                <h4 className="text-xl font-bold text-dark mb-2">{achievement.title}</h4>
                <p className="text-gray-medium">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
