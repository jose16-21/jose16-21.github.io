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
    <section className="experience" id="experiencia">
      <div className="container">
        <div className="section-header">
          <h2>Experiencia Profesional</h2>
          <p>Trayectoria y logros en el desarrollo tecnológico</p>
        </div>
        <div className="experience-timeline">
          {timeline.map((item) => (
            <div 
              key={item.id} 
              className="timeline-item" 
              data-aos="fade-up" 
              data-aos-delay={item.delay}
            >
              <div className="timeline-date">{item.period}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <h4>{item.company}</h4>
                <p>{item.description}</p>
                <ul>
                  {item.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="achievements">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.title} 
              className="achievement-item" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="achievement-icon">
                <i className={`fas ${achievement.icon}`}></i>
              </div>
              <div className="achievement-content">
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
