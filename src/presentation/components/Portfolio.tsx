import React, { useEffect, useState } from 'react';
import { GetProjectsUseCase } from '../../domain/use-cases/GetProjectsUseCase';
import { ProjectRepositoryImpl } from '../../infrastructure/repositories/ProjectRepositoryImpl';
import { Project } from '../../domain/entities/Project';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const repository = new ProjectRepositoryImpl();
        const useCase = new GetProjectsUseCase(repository);
        const data = await useCase.execute();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white" id="portafolio">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-medium">Cargando proyectos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white" id="portafolio">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">Algunos de los proyectos más relevantes en mi carrera</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-xl shadow-md border border-gray-lighter overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary group" 
              data-aos="fade-up" 
              data-aos-delay={project.delay}
            >
              <div className="relative h-32 bg-gradient-primary flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <i className={`fas ${project.icon} text-4xl text-white`}></i>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-dark flex-1">{project.title}</h3>
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-primary hover:text-dark transition-colors"
                      title="Ver proyecto"
                    >
                      <i className="fas fa-external-link-alt text-sm"></i>
                    </a>
                  )}
                </div>
                <p className="text-sm text-primary font-semibold mb-1">{project.company}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-500">{project.country}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{project.period}</span>
                </div>
                <p className="text-sm text-gray-medium mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 text-xs rounded-full transition-colors">{tech}</span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">+{project.technologies.length - 5}</span>
                  )}
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
