import React, { useEffect, useState } from 'react';
import {
  SiAmazon,
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
import { FaExternalLinkAlt } from 'react-icons/fa';
import { faIconMap } from '../utils/faIconMap';
import { GetExperiencesUseCase } from '../../domain/use-cases/GetExperiencesUseCase';
import { ExperienceRepositoryImpl } from '../../infrastructure/repositories/ExperienceRepositoryImpl';
import { ExperienceData } from '../../domain/entities/Experience';

// Mapa de iconos para DevOps tools
const iconMap: Record<string, React.ReactElement> = {
  SiAmazon: <SiAmazon className="w-8 h-8" />,
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

// Componente de fondo animado
const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      {/* Gradiente lateral */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent"></div>
      
      {/* Líneas decorativas animadas */}
      <div className="absolute top-1/4 left-[10%] w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse"></div>
      <div className="absolute top-1/3 left-[5%] w-px h-32 bg-gradient-to-b from-transparent via-secondary/15 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 right-[10%] w-px h-36 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-[5%] w-px h-28 bg-gradient-to-b from-transparent via-secondary/15 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Círculos decorativos flotantes */}
      <div className="absolute top-[15%] left-[8%] w-64 h-64 border border-primary/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute top-[20%] left-[12%] w-48 h-48 border border-secondary/10 rounded-full animate-[spin_45s_linear_infinite_reverse]"></div>
      
      <div className="absolute bottom-[15%] right-[8%] w-72 h-72 border border-secondary/10 rounded-full animate-[spin_50s_linear_infinite]"></div>
      <div className="absolute bottom-[20%] right-[12%] w-56 h-56 border border-primary/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
      
      {/* Puntos flotantes animados */}
      <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute top-[50%] left-[15%] w-3 h-3 bg-secondary/15 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
      <div className="absolute top-[70%] left-[25%] w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>
      
      <div className="absolute top-[25%] right-[20%] w-3 h-3 bg-secondary/15 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.3s' }}></div>
      <div className="absolute top-[45%] right-[15%] w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.8s' }}></div>
      <div className="absolute top-[65%] right-[25%] w-3 h-3 bg-secondary/15 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.2s' }}></div>
      
      {/* Formas geométricas sutiles */}
      <div className="absolute top-[40%] left-[3%] w-20 h-20 border border-primary/10 rotate-45 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-[40%] right-[3%] w-16 h-16 border border-secondary/10 rotate-12 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      
      {/* Líneas horizontales decorativas */}
      <div className="absolute top-[20%] left-0 w-32 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-[20%] right-0 w-40 h-px bg-gradient-to-l from-transparent via-secondary/15 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }}></div>
    </div>
  );
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
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <p className="text-gray-medium">Cargando experiencia...</p>
        </div>
      </section>
    );
  }

  const { timeline, achievements, devopsTools } = experienceData;

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="experiencia">
      {/* Fondo animado */}
      <AnimatedBackground />
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Experiencia Profesional</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">Trayectoria enfocada en arquitectura de software y liderazgo técnico.</p>
        </div>

        {/* Timeline */}
        <div className="relative before:absolute before:left-[21px] before:top-2 before:bottom-0 before:w-px before:bg-gray-200 md:before:left-1/2 md:before:-ml-px">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="relative flex items-start mb-12 md:mb-16"
                data-aos="fade-up"
                data-aos-delay={item.delay}
              >
                {/* Dot */}
                <div className="absolute left-[14px] w-4 h-4 bg-white rounded-full border-2 border-primary md:left-1/2 md:-ml-2 z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}>
                  <span className="inline-block px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-medium mb-3 tracking-wide uppercase">{item.period}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>

                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-base text-primary font-medium mb-3 hover:text-primary-dark transition-colors ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                      <span className="text-lg">{item.countryFlag}</span>
                      <span>{item.company}</span>
                      {item.remote && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Remoto</span>}
                      <FaExternalLinkAlt className="text-xs opacity-50" />
                    </a>
                  ) : (
                    <h4 className={`inline-flex items-center gap-2 text-base text-primary font-medium mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-lg">{item.countryFlag}</span>
                      <span>{item.company}</span>
                      {item.remote && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Remoto</span>}
                    </h4>
                  )}

                  <p className="text-gray-600 mb-4 leading-relaxed font-light">{item.description}</p>

                  <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-block px-2.5 py-0.5 bg-gray-50 text-gray-600 text-xs rounded border border-gray-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-gray-200 transition-colors"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 text-primary">
                  { (() => { const I = faIconMap[achievement.icon]; return I ? <I className="text-lg" /> : null; })() }
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DevOps Tools Bar at Bottom */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-8">Tecnologías & Herramientas</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
            {devopsTools.map((tool, index) => (
              <div
                key={tool.name}
                className="group flex flex-col items-center gap-2"
                data-aos="fade-in"
                data-aos-delay={index * 50}
                title={tool.name}
              >
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors transform group-hover:scale-110 duration-300">
                  {iconMap[tool.icon]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
