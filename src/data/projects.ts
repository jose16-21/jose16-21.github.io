import { ProjectsData } from '../domain/entities/Project';

export const projectsData: ProjectsData = {
  projects: [
    {
      id: 1,
      title: 'Sistema de Gestión Empresarial',
      company: 'Distribuidora Don Julio S.A. y Distribuidora Anabel S.A.',
      country: 'Guatemala',
      period: '2019 - 2025',
      description: 'Aplicativo web y móvil para administración y ventas de productos de primera necesidad, con integración de factura electrónica SAT.',
      achievements: [
        'Desarrollo de arquitectura Micro frontend con Angular',
        'Aplicación móvil híbrida con Ionic Framework',
        'Infraestructura en AWS (EC2, Route 53, RDS)',
        'Orquestador Kubernetes con Docker'
      ],
      technologies: [
        'Angular 10',
        'Ionic',
        'Node.js',
        'Express.js',
        'Kubernetes',
        'Docker',
        'AWS',
        'MySQL',
        'SQL Server',
        'Jenkins'
      ],
      icon: 'fa-store',
      delay: 0
    },
    {
      id: 2,
      title: 'Plataforma Multi-Cliente',
      company: 'QuickComm Company',
      country: 'Perú',
      period: '2022 - 2024',
      url: 'https://www.linkedin.com/company/gravitymarketplace/',
      description: 'Desarrollo de soluciones tecnológicas para múltiples clientes en Perú y Argentina con arquitectura escalable.',
      achievements: [
        'Integración con sistemas de Courier (Envíame, Urbano)',
        'Implementación de factura electrónica',
        'IaC con Terraform en Azure',
        'Configuración de Apache Kafka'
      ],
      technologies: [
        '.NET Core',
        'C#',
        'SQL Server',
        'Docker',
        'Azure',
        'Terraform',
        'Apache Kafka',
        'Microservicios'
      ],
      icon: 'fa-project-diagram',
      delay: 100
    },
    {
      id: 3,
      title: 'Sistema Bancario Mobile',
      company: 'Menoo App',
      country: 'Uruguay',
      period: '2021 - 2022',
      url: 'https://www.linkedin.com/company/menoouy/',
      description: 'Desarrollo de aplicativo SPA y móvil para gestión administrativa, super admin y factura electrónica.',
      achievements: [
        'SPA con Ionic Angular',
        'Infraestructura en AWS (EC2, ELB, Route 53)',
        'CI/CD con Jenkins y GitHub Actions',
        'Integración con Firebase'
      ],
      technologies: [
        'Angular',
        'Ionic',
        '.NET Core',
        'C#',
        'AWS',
        'SQL Server',
        'Firebase',
        'Jenkins',
        'SonarQube'
      ],
      icon: 'fa-mobile-alt',
      delay: 200
    },
    {
      id: 4,
      title: 'Sistemas Financieros',
      company: 'Technology Center',
      country: 'Guatemala',
      period: '2021 - 2022',
      url: 'https://www.tsc.com.gt/',
      description: 'Aplicativos financieros para gestión de créditos con integración a banca virtual Banrural.',
      achievements: [
        'SPA con arquitectura limpia en Angular 12',
        'REST API con Clean Architecture',
        'Integración con Web Services SOAP/REST',
        'Cosmos DB y SQL Server'
      ],
      technologies: [
        'Angular 12',
        'TypeScript',
        '.NET Core',
        'C#',
        'Cosmos DB',
        'SQL Server',
        'Azure DevOps',
        'Clean Architecture'
      ],
      icon: 'fa-university',
      delay: 300
    },
    {
      id: 5,
      title: 'Ventanilla Única Virtual',
      company: 'USAID / Municipalidad Villa Nueva',
      country: 'Guatemala',
      period: '2021',
      url: 'https://www.villanueva.gob.gt/ventanilla-unica-municipal/',
      description: 'Sistema de ventanilla única virtual para trámites municipales con integración de servicios web SOAP.',
      achievements: [
        'Desarrollo e integración con servicios SOAP',
        'Frontend con Angular',
        'Backend con .NET Core',
        'Gestión de trámites digitales'
      ],
      technologies: [
        '.NET Core',
        'C#',
        'Angular',
        'SQL Server',
        'SOAP',
        'JavaScript',
        'TypeScript'
      ],
      icon: 'fa-city',
      delay: 400
    }
  ]
};
