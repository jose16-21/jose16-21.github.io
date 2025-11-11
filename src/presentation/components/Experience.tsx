import React, { useEffect, useState } from 'react';
import { 
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiGitlab,
  SiArgo
} from 'react-icons/si';
import { FaCloud } from 'react-icons/fa';
import { GetExperiencesUseCase } from '../../domain/use-cases/GetExperiencesUseCase';
import { ExperienceRepositoryImpl } from '../../infrastructure/repositories/ExperienceRepositoryImpl';
import { ExperienceData } from '../../domain/entities/Experience';

// Mapa de iconos para DevOps tools
const iconMap: Record<string, React.ReactElement> = {
  SiDocker: <SiDocker className="w-8 h-8" />,
  SiKubernetes: <SiKubernetes className="w-8 h-8" />,
  SiJenkins: <SiJenkins className="w-8 h-8" />,
  SiGithubactions: <SiGithubactions className="w-8 h-8" />,
  SiTerraform: <SiTerraform className="w-8 h-8" />,
  SiPrometheus: <SiPrometheus className="w-8 h-8" />,
  SiGrafana: <SiGrafana className="w-8 h-8" />,
  SiGitlab: <SiGitlab className="w-8 h-8" />,
  SiArgo: <SiArgo className="w-8 h-8" />
};

const Experience: React.FC = () => {
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const repository = new ExperienceRepositoryImpl();
        const useCase = new GetExperiencesUseCase(repository);
        const data = await useCase.execute();
        setExperienceData(data);
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  if (loading || !experienceData) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" id="experiencia">
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <p className="text-gray-medium">Cargando experiencia...</p>
        </div>
      </section>
    );
  }

  const { timeline, achievements, devopsTools } = experienceData;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" id="experiencia">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Experiencia Profesional</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">Trayectoria y logros en el desarrollo tecnológico</p>
          
          {/* DevOps & Cloud badge */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              <SiAmazon className="w-4 h-4" /> AWS
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
              <FaCloud className="w-4 h-4" /> Azure
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              <SiGooglecloud className="w-4 h-4" /> GCP
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              ♾️ DevOps & CI/CD
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative before:absolute before:left-[30px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-primary md:before:left-1/2">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={item.id} 
                className="relative flex items-start mb-8 md:mb-10" 
                data-aos="fade-up" 
                data-aos-delay={item.delay}
              >
                <div className="absolute left-[22px] w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg md:left-1/2 md:-ml-2 animate-pulse z-10"></div>
                <div className={`ml-16 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-lighter transition-all hover:-translate-y-2 hover:shadow-xl hover:border-primary md:ml-0 md:w-[calc(50%-60px)] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="inline-block px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold mb-4">{item.period}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-dark mb-2">{item.title}</h3>
                    {item.companyUrl ? (
                      <a 
                        href={item.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg text-primary font-semibold mb-4 hover:underline transition-all group"
                      >
                        {item.companyLogo && (
                          <img 
                            src={item.companyLogo} 
                            alt={`${item.company} logo`} 
                            className="w-5 h-5 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        )}
                        <span>{item.company}</span>
                        <i className="fas fa-external-link-alt text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </a>
                    ) : (
                      <h4 className="text-lg text-primary font-semibold mb-4">{item.company}</h4>
                    )}
                    <p className="text-gray-medium mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="inline-block px-3 py-1 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 text-sm rounded-full transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.title} 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-lighter transition-all hover:-translate-y-2 hover:shadow-xl hover:border-primary flex gap-6" 
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

        {/* DevOps Tools Bar at Bottom */}
        <div className="mt-20 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-dark text-center mb-6">Stack DevOps & Cloud</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {devopsTools.map((tool, index) => (
              <div
                key={tool.name}
                className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div style={{ color: tool.color }} className="transform transition-transform">
                  {iconMap[tool.icon]}
                </div>
                <span className="text-xs text-gray-600 font-medium group-hover:text-primary transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
