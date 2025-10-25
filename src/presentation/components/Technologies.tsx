import React from 'react';

const Technologies: React.FC = () => {
  const techCategories = [
    {
      title: 'Frontend',
      icon: 'fa-desktop',
      technologies: [
        { icon: 'fab fa-react', name: 'React' },
        { icon: 'fab fa-angular', name: 'Angular' },
        { icon: 'fab fa-vuejs', name: 'Vue.js' },
        { icon: 'fab fa-js', name: 'JavaScript' },
        { icon: 'fab fa-html5', name: 'HTML5' },
        { icon: 'fab fa-css3-alt', name: 'CSS3' },
      ]
    },
    {
      title: 'Backend',
      icon: 'fa-server',
      technologies: [
        { icon: 'fab fa-node-js', name: 'Node.js' },
        { icon: 'fab fa-python', name: 'Python' },
        { icon: 'fab fa-java', name: 'Java' },
        { icon: 'fas fa-hashtag', name: 'C#/.NET' },
        { icon: 'fab fa-php', name: 'PHP' },
        { icon: 'fas fa-gem', name: 'Ruby' },
      ]
    },
    {
      title: 'Base de Datos',
      icon: 'fa-database',
      technologies: [
        { icon: 'fas fa-database', name: 'MySQL' },
        { icon: 'fas fa-database', name: 'PostgreSQL' },
        { icon: 'fas fa-leaf', name: 'MongoDB' },
        { icon: 'fas fa-fire', name: 'Firebase' },
        { icon: 'fas fa-database', name: 'Redis' },
        { icon: 'fas fa-database', name: 'SQL Server' },
      ]
    },
    {
      title: 'Móvil & Cloud',
      icon: 'fa-mobile-alt',
      technologies: [
        { icon: 'fab fa-react', name: 'React Native' },
        { icon: 'fas fa-mobile', name: 'Flutter' },
        { icon: 'fab fa-aws', name: 'AWS' },
        { icon: 'fab fa-google', name: 'Google Cloud' },
        { icon: 'fab fa-microsoft', name: 'Azure' },
        { icon: 'fab fa-docker', name: 'Docker' },
      ]
    }
  ];

  return (
    <section className="technologies" id="tecnologias">
      <div className="container">
        <div className="section-header">
          <h2>Stack Tecnológico</h2>
          <p>Dominio amplio en tecnologías modernas de desarrollo</p>
        </div>
        <div className="tech-categories">
          {techCategories.map((category, index) => (
            <div 
              key={category.title} 
              className="tech-category" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <h3>
                <i className={`fas ${category.icon}`}></i> {category.title}
              </h3>
              <div className="tech-grid">
                {category.technologies.map((tech) => (
                  <div key={tech.name} className="tech-item">
                    <i className={tech.icon}></i>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
