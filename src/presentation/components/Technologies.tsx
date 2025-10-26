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
    <section className="py-24 bg-gray-lighter" id="tecnologias">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Stack Tecnológico</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">Dominio amplio en tecnologías modernas de desarrollo</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category, index) => (
            <div 
              key={category.title} 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-lighter transition-all hover:-translate-y-2 hover:shadow-xl hover:border-primary" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <h3 className="text-2xl font-bold text-dark mb-6 flex items-center gap-3">
                <i className={`fas ${category.icon} text-primary`}></i> {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.technologies.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2 p-4 bg-gray-lighter rounded-lg hover:bg-gradient-primary hover:text-white hover:-translate-y-1 hover:shadow-md transition-all group">
                    <i className={`${tech.icon} text-2xl text-primary group-hover:text-white transition-colors`}></i>
                    <span className="text-sm font-medium text-gray-dark group-hover:text-white transition-colors text-center">{tech.name}</span>
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
