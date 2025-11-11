import { ExperienceData } from '../domain/entities/Experience';

export const experiencesData: ExperienceData = {
  timeline: [
    {
      id: 1,
      period: '2023 - Presente',
      title: 'Tech Lead',
      company: 'Capital Valley Tech • Guatemala (Remoto)',
      companyUrl: 'https://www.capitalvalleytech.com/',
      companyLogo: 'https://www.capitalvalleytech.com/favicon.ico',
      description: 'Liderazgo técnico del equipo de desarrollo, planificación con producto, diseño de arquitecturas y establecimiento de mejores prácticas.',
      skills: [
        'AWS',
        'Kubernetes',
        'Docker',
        'Terraform',
        'TypeScript',
        'Adonis JS',
        'Nest JS',
        'MongoDB',
        'SQL Server',
        'CI/CD',
        'Krakend Gateway',
        'S3',
        'DynamoDB',
        'ECR',
        'EC2'
      ],
      delay: 0
    },
    {
      id: 2,
      period: '2022 - 2023',
      title: 'Sr. Full Stack Developer',
      company: 'Finerio Connect • México (Remoto)',
      companyUrl: 'https://www.finerioconnect.com/',
      companyLogo: 'https://www.finerioconnect.com/favicon.ico',
      description: 'Desarrollo de soluciones bancarias, web scraping y arquitectura serverless con enfoque en Clean Architecture.',
      skills: [
        'Python',
        'AWS Lambda',
        'Terraform',
        'CloudFormation',
        'C#',
        'Web Scraping',
        'Clean Architecture',
        'SonarQube',
        'Unit Testing',
        'Code Pipeline'
      ],
      delay: 100
    },
    {
      id: 3,
      period: '2021 - 2022',
      title: 'Sr. Backend Developer',
      company: 'Rappi • Colombia (Remoto)',
      companyUrl: 'https://www.rappi.com/',
      companyLogo: 'https://www.rappi.com/favicon.ico',
      description: 'Desarrollo y mejoras en microservicios, micro frontends e integración con CRM Lupe en el squad Partner Support.',
      skills: [
        'Microservicios',
        'Apache Kafka',
        'MongoDB',
        'MySQL',
        'PostgreSQL',
        'Docker',
        'TypeScript',
        'Angular',
        'Jenkins',
        'Firebase',
        'Redash',
        'SignalFx',
        'LogDNA'
      ],
      delay: 200
    },
    {
      id: 4,
      period: '2019 - 2021',
      title: 'Analista Programador',
      company: 'Business Development Group • Guatemala',
      companyUrl: 'https://bdgsa.net/',
      companyLogo: 'https://bdgsa.net/favicon.ico',
      description: 'Desarrollo y mejoras en sistema bancario Sigma 7 para clientes como Cooperativa Génesis Empresarial, Grupo TRT y BAC Credomatic.',
      skills: [
        '.NET',
        '.NET Core',
        'C#',
        'SQL Server',
        'WCF',
        'REST API',
        'Microservicios',
        'Reporting Services',
        'Azure DevOps',
        'IIS'
      ],
      delay: 300
    },
    {
      id: 5,
      period: '2014 - 2018',
      title: 'Analista Programador',
      company: 'E-Solutions S.A. • Guatemala',
      companyUrl: 'https://www.e-solutions.com.gt/',
      companyLogo: 'https://www.e-solutions.com.gt/favicon.ico',
      description: 'Análisis, desarrollo y mantenimiento de productos financieros corporativos con tecnologías Microsoft.',
      skills: [
        'C#',
        'VB',
        'SQL Server',
        'N-Capas',
        'SOAP',
        'REST',
        'SSRS',
        'Store Procedures',
        'AS400',
        'IIS',
        'XML'
      ],
      delay: 400
    }
  ],
  achievements: [
    {
      icon: 'fa-trophy',
      title: 'Certificaciones Profesionales',
      description: 'Scrum Fundamental Certified, Certified Secure Development, Business Intelligence (UVG)'
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Educación',
      description: 'Ingeniero en Sistemas (UMG), Técnico en Software (UVG), +50 cursos profesionales en Platzi'
    }
  ],
  devopsTools: [
    { name: 'Docker', icon: 'SiDocker', color: '#2496ED' },
    { name: 'Kubernetes', icon: 'SiKubernetes', color: '#326CE5' },
    { name: 'Jenkins', icon: 'SiJenkins', color: '#D24939' },
    { name: 'GitHub Actions', icon: 'SiGithubactions', color: '#2088FF' },
    { name: 'Terraform', icon: 'SiTerraform', color: '#7B42BC' },
    { name: 'Prometheus', icon: 'SiPrometheus', color: '#E6522C' },
    { name: 'Grafana', icon: 'SiGrafana', color: '#F46800' },
    { name: 'GitLab', icon: 'SiGitlab', color: '#FC6D26' },
    { name: 'ArgoCD', icon: 'SiArgo', color: '#EF7B4D' }
  ]
};
