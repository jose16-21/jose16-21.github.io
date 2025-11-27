import { ExperienceData } from '../domain/entities/Experience';

export const experiencesData: ExperienceData = {
  timeline: [
    {
      id: 1,
      period: '2023 - Presente',
      title: 'Tech Lead',
      company: 'Capital Valley Tech',
      country: 'Guatemala',
      countryFlag: '🇬🇹',
      remote: true,
      companyUrl: 'https://www.capitalvalleytech.com/',
      companyLogo: 'https://www.capitalvalleytech.com/favicon.ico',
      description: 'Liderazgo técnico y definición de arquitectura cloud-native. Implementación de mejores prácticas DevOps, diseño de soluciones escalables en AWS y mentoría de equipos de alto rendimiento.',
      skills: [
        'AWS Architecture',
        'Kubernetes',
        'Terraform',
        'Microservices',
        'Node.js',
        'TypeScript',
        'CI/CD Pipelines',
        'System Design'
      ],
      delay: 0
    },
    {
      id: 2,
      period: '2022 - 2023',
      title: 'Sr. Full Stack Developer',
      company: 'Finerio Connect',
      country: 'México',
      countryFlag: '🇲🇽',
      remote: true,
      companyUrl: 'https://www.finerioconnect.com/',
      companyLogo: 'https://www.finerioconnect.com/favicon.ico',
      description: 'Arquitectura de soluciones financieras serverless. Optimización de procesos de data scraping e implementación de Clean Architecture para garantizar escalabilidad y mantenibilidad.',
      skills: [
        'Serverless',
        'AWS Lambda',
        'Python',
        'Clean Architecture',
        'Fintech',
        'Web Scraping',
        'SonarQube'
      ],
      delay: 100
    },
    {
      id: 3,
      period: '2021 - 2022',
      title: 'Sr. Backend Developer',
      company: 'Rappi',
      country: 'Colombia',
      countryFlag: '🇨🇴',
      remote: true,
      companyUrl: 'https://www.rappi.com/',
      companyLogo: 'https://www.rappi.com/favicon.ico',
      description: 'Desarrollo de microservicios de alto rendimiento. Integración de sistemas críticos y optimización de flujos operativos en entornos de alta concurrencia.',
      skills: [
        'High Concurrency',
        'Microservices',
        'Apache Kafka',
        'MongoDB',
        'PostgreSQL',
        'Docker',
        'Redis'
      ],
      delay: 200
    },
    {
      id: 4,
      period: '2019 - 2021',
      title: 'Analista Programador',
      company: 'Business Development Group',
      country: 'Guatemala',
      countryFlag: '🇬🇹',
      remote: false,
      companyUrl: 'https://bdgsa.net/',
      companyLogo: 'https://bdgsa.net/favicon.ico',
      description: 'Modernización de sistemas bancarios core. Migración a arquitecturas de microservicios y optimización de APIs REST para el sector financiero.',
      skills: [
        '.NET Core',
        'C#',
        'SQL Server',
        'REST APIs',
        'Azure DevOps',
        'Banking Systems'
      ],
      delay: 300
    },
    {
      id: 5,
      period: '2014 - 2018',
      title: 'Analista Programador',
      company: 'E-Solutions S.A.',
      country: 'Guatemala',
      countryFlag: '🇬🇹',
      remote: false,
      companyUrl: 'https://www.e-solutions.com.gt/',
      companyLogo: 'https://www.e-solutions.com.gt/favicon.ico',
      description: 'Ingeniería de software para sector financiero. Desarrollo full-stack de productos corporativos y optimización de bases de datos transaccionales.',
      skills: [
        'Full Stack .NET',
        'SQL Optimization',
        'N-Tier Architecture',
        'Financial Software',
        'SOAP/REST'
      ],
      delay: 400
    }
  ],
  achievements: [
    {
      icon: 'fa-certificate',
      title: 'Certificaciones & Formación',
      description: 'Scrum Fundamental Certified, Certified Secure Development, Business Intelligence (UVG). Ingeniero en Sistemas (UMG).'
    },
    {
      icon: 'fa-cloud',
      title: 'Expertise Cloud & DevOps',
      description: 'Especialización en AWS (Route 53, EC2, ELB, S3, RDS), Docker, Kubernetes y Pipelines de CI/CD (Jenkins, GitHub Actions).'
    }
  ],
  devopsTools: [
    { name: 'AWS', icon: 'SiAmazon', color: '#FF9900' },
    { name: 'Docker', icon: 'SiDocker', color: '#2496ED' },
    { name: 'Kubernetes', icon: 'SiKubernetes', color: '#326CE5' },
    { name: 'Terraform', icon: 'SiTerraform', color: '#7B42BC' },
    { name: 'Jenkins', icon: 'SiJenkins', color: '#D24939' },
    { name: 'GitLab', icon: 'SiGitlab', color: '#FC6D26' }
  ]
};
