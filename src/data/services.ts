import { Service, ServiceCategory } from '../domain/entities/Service';

export const serviceCategories: ServiceCategory[] = [
  'web-development',
  'mobile-development',
  'devops',
  'cloud-architecture',
  'consulting',
  'training'
];

export const servicesData: Service[] = [
  {
    id: 'web-app-development',
    title: 'Desarrollo de Aplicaciones Web',
    shortDescription: 'Aplicaciones web modernas y escalables con las últimas tecnologías',
    description: 'Desarrollo de aplicaciones web completas utilizando frameworks modernos como React, Vue, Angular y Next.js. Implementación de arquitecturas escalables, integración de APIs y despliegue en la nube.',
    category: 'web-development',
    icon: 'fa-code',
    features: [
      'Aplicaciones SPA (Single Page Application)',
      'Desarrollo con React, Vue o Angular',
      'Integración con APIs RESTful y GraphQL',
      'Diseño responsive y mobile-first',
      'Optimización de rendimiento y SEO',
      'Despliegue automatizado CI/CD',
      'Soporte y mantenimiento incluido',
      'Documentación técnica completa'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'],
    price: {
      type: 'project',
      amount: 2500,
      currency: 'USD',
      period: 'por proyecto'
    },
    deliveryTime: '4-8 semanas',
    featured: true,
    available: true,
    imageUrl: '/images/web-development.jpg'
  },
  {
    id: 'mobile-app-development',
    title: 'Desarrollo de Aplicaciones Móviles',
    shortDescription: 'Apps nativas e híbridas para iOS y Android',
    description: 'Desarrollo de aplicaciones móviles multiplataforma con React Native o Flutter. Experiencias nativas de alta calidad para iOS y Android desde una única base de código.',
    category: 'mobile-development',
    icon: 'fa-mobile-alt',
    features: [
      'Aplicaciones nativas para iOS y Android',
      'Desarrollo con React Native o Flutter',
      'Integración con servicios backend',
      'Notificaciones push',
      'Autenticación y seguridad',
      'Publicación en App Store y Google Play',
      'Actualizaciones OTA (Over The Air)',
      'Analytics y monitoreo integrado'
    ],
    technologies: ['React Native', 'Flutter', 'Firebase', 'Redux'],
    price: {
      type: 'project',
      amount: 3500,
      currency: 'USD',
      period: 'por proyecto'
    },
    deliveryTime: '6-10 semanas',
    featured: true,
    available: true,
    imageUrl: '/images/mobile-development.jpg'
  },
  {
    id: 'devops-automation',
    title: 'DevOps y Automatización',
    shortDescription: 'Pipelines CI/CD y automatización de infraestructura',
    description: 'Implementación de prácticas DevOps, pipelines de integración y despliegue continuo, automatización de infraestructura con Infrastructure as Code y monitoreo de aplicaciones.',
    category: 'devops',
    icon: 'fa-infinity',
    features: [
      'Configuración de pipelines CI/CD',
      'Automatización con GitHub Actions, Jenkins, GitLab CI',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Containerización con Docker y Kubernetes',
      'Monitoreo y logging centralizado',
      'Gestión de secretos y configuraciones',
      'Optimización de costos cloud',
      'Documentación de procesos'
    ],
    technologies: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS'],
    price: {
      type: 'hourly',
      amount: 80,
      currency: 'USD',
      period: 'por hora'
    },
    deliveryTime: '2-4 semanas',
    featured: false,
    available: true,
    imageUrl: '/images/devops.jpg'
  },
  {
    id: 'cloud-architecture',
    title: 'Arquitectura Cloud',
    shortDescription: 'Diseño de soluciones escalables en AWS, Azure y GCP',
    description: 'Diseño e implementación de arquitecturas cloud escalables, seguras y eficientes. Migración de aplicaciones on-premise a la nube y optimización de recursos.',
    category: 'cloud-architecture',
    icon: 'fa-cloud',
    features: [
      'Diseño de arquitecturas cloud-native',
      'Migración a AWS, Azure o Google Cloud',
      'Implementación de microservicios',
      'Alta disponibilidad y disaster recovery',
      'Seguridad y compliance',
      'Auto-scaling y optimización de costos',
      'Serverless y contenedores',
      'Arquitecturas multi-cloud'
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Serverless', 'Lambda'],
    price: {
      type: 'project',
      amount: 4000,
      currency: 'USD',
      period: 'por proyecto'
    },
    deliveryTime: '4-6 semanas',
    featured: true,
    available: true,
    imageUrl: '/images/cloud-architecture.jpg'
  },
  {
    id: 'tech-consulting',
    title: 'Consultoría Tecnológica',
    shortDescription: 'Asesoramiento estratégico en tecnología y arquitectura',
    description: 'Consultoría especializada en tecnología, arquitectura de software, selección de tecnologías, code review, auditorías técnicas y optimización de procesos de desarrollo.',
    category: 'consulting',
    icon: 'fa-lightbulb',
    features: [
      'Auditorías de código y arquitectura',
      'Selección de stack tecnológico',
      'Optimización de rendimiento',
      'Code review y mejores prácticas',
      'Mentoría técnica de equipos',
      'Planificación de proyectos',
      'Evaluación de seguridad',
      'Recomendaciones estratégicas'
    ],
    technologies: ['Múltiples tecnologías', 'Best Practices', 'Architecture Patterns'],
    price: {
      type: 'hourly',
      amount: 100,
      currency: 'USD',
      period: 'por hora'
    },
    deliveryTime: 'Flexible',
    featured: false,
    available: true,
    imageUrl: '/images/consulting.jpg'
  },
  {
    id: 'technical-training',
    title: 'Capacitación Técnica',
    shortDescription: 'Cursos y workshops personalizados para equipos',
    description: 'Capacitación técnica personalizada para equipos de desarrollo. Workshops, bootcamps y cursos sobre tecnologías modernas, mejores prácticas y metodologías ágiles.',
    category: 'training',
    icon: 'fa-graduation-cap',
    features: [
      'Workshops de tecnologías modernas',
      'Capacitación en React, Node.js, TypeScript',
      'DevOps y Cloud para desarrolladores',
      'Arquitectura de software',
      'Metodologías ágiles',
      'Clean Code y principios SOLID',
      'Material didáctico incluido',
      'Sesiones prácticas y hands-on'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS'],
    price: {
      type: 'fixed',
      amount: 1500,
      currency: 'USD',
      period: 'por workshop (2 días)'
    },
    deliveryTime: '2-3 días',
    featured: false,
    available: true,
    imageUrl: '/images/training.jpg'
  },
  {
    id: 'api-development',
    title: 'Desarrollo de APIs',
    shortDescription: 'APIs RESTful y GraphQL escalables y seguras',
    description: 'Desarrollo de APIs robustas y escalables con Node.js, Express, NestJS o Python. Implementación de GraphQL, autenticación JWT, documentación con Swagger y deployment.',
    category: 'web-development',
    icon: 'fa-plug',
    features: [
      'APIs RESTful con mejores prácticas',
      'GraphQL APIs',
      'Autenticación y autorización (JWT, OAuth)',
      'Documentación automática con Swagger',
      'Versionado de APIs',
      'Rate limiting y caching',
      'Testing automatizado',
      'Despliegue en contenedores'
    ],
    technologies: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'PostgreSQL'],
    price: {
      type: 'project',
      amount: 1800,
      currency: 'USD',
      period: 'por proyecto'
    },
    deliveryTime: '3-5 semanas',
    featured: false,
    available: true,
    imageUrl: '/images/api-development.jpg'
  },
  {
    id: 'ecommerce-solutions',
    title: 'Soluciones E-commerce',
    shortDescription: 'Tiendas online completas con pasarelas de pago',
    description: 'Desarrollo de plataformas e-commerce completas con carrito de compras, gestión de productos, integración de pasarelas de pago, panel de administración y analytics.',
    category: 'web-development',
    icon: 'fa-shopping-cart',
    features: [
      'Catálogo de productos dinámico',
      'Carrito de compras avanzado',
      'Integración con Stripe, PayPal, MercadoPago',
      'Panel de administración completo',
      'Gestión de inventario',
      'Sistema de cupones y descuentos',
      'Analytics e informes de ventas',
      'SEO optimizado para productos'
    ],
    technologies: ['Next.js', 'React', 'Stripe', 'PostgreSQL', 'Redis'],
    price: {
      type: 'project',
      amount: 3200,
      currency: 'USD',
      period: 'por proyecto'
    },
    deliveryTime: '6-8 semanas',
    featured: false,
    available: true,
    imageUrl: '/images/ecommerce.jpg'
  },
  {
    id: 'cms-strapi-aws',
    title: 'CMS Headless con Strapi en AWS',
    shortDescription: 'Sistema de gestión de contenido con arquitectura completa en AWS',
    description: 'Implementación de Strapi CMS con arquitectura enterprise en AWS. Incluye CloudFront para CDN, contenedores ECS/Fargate para el backend, Aurora PostgreSQL para base de datos, S3 para assets, y configuración completa de seguridad y escalabilidad.',
    category: 'web-development',
    icon: 'fa-server',
    features: [
      'Strapi CMS headless personalizado',
      'CloudFront CDN para distribución global',
      'ECS Fargate para contenedores sin servidor',
      'Aurora PostgreSQL Serverless para base de datos',
      'S3 + CloudFront para almacenamiento de media',
      'API RESTful y GraphQL',
      'Sistema de autenticación y roles',
      'Panel de administración personalizado',
      'Backup automático y disaster recovery',
      'Auto-scaling basado en demanda',
      'VPC con subredes públicas y privadas',
      'Application Load Balancer',
      'Route 53 para DNS',
      'Certificate Manager para SSL/TLS',
      'CloudWatch para monitoreo y logs',
      'WAF para protección contra ataques',
      'Secrets Manager para credenciales',
      'CI/CD con CodePipeline',
      'Documentación de API completa',
      'Migración de contenido existente'
    ],
    technologies: [
      'Strapi CMS',
      'Node.js',
      'PostgreSQL',
      'AWS CloudFront',
      'AWS ECS Fargate',
      'AWS Aurora Serverless',
      'AWS S3',
      'AWS VPC',
      'AWS ALB',
      'Docker',
      'Terraform',
      'GraphQL',
      'REST API'
    ],
    price: {
      type: 'project',
      amount: 5500,
      currency: 'USD',
      period: 'por proyecto'
    },
    deliveryTime: '8-12 semanas',
    featured: true,
    available: true,
    imageUrl: '/images/cms-aws.jpg'
  },
  {
    id: 'iac-multi-cloud-terraform',
    title: 'Infraestructura como Código Multi-Cloud',
    shortDescription: 'IaC con Terraform para AWS, Azure y GCP con CI/CD completo',
    description: 'Implementación de infraestructura como código (IaC) usando Terraform para despliegues multi-cloud en AWS, Azure y Google Cloud Platform. Incluye pipelines CI/CD automatizados, módulos reutilizables, gestión de estados remoto, políticas de seguridad, y mejores prácticas de DevOps.',
    category: 'devops',
    icon: 'fa-code-branch',
    features: [
      'Módulos Terraform reutilizables y versionados',
      'Soporte para AWS, Azure y Google Cloud',
      'State management remoto con backend S3/Azure Blob/GCS',
      'Workspaces para múltiples entornos (dev, staging, prod)',
      'CI/CD con GitHub Actions, GitLab CI o Azure DevOps',
      'Terraform Cloud integration',
      'Políticas de seguridad con Sentinel/OPA',
      'Drift detection automático',
      'Plan y apply automatizados',
      'Rollback automático en caso de error',
      'Secrets management integrado',
      'Cost estimation pre-deployment',
      'Documentación automática de infraestructura',
      'Variables y configuración por entorno',
      'Testing de infraestructura con Terratest',
      'Compliance as Code (CIS benchmarks)',
      'Networking multi-cloud (VPC, VNet, VPC)',
      'Kubernetes clusters gestionados (EKS, AKS, GKE)',
      'Monitoreo y alertas unificado',
      'Disaster recovery y backup automático',
      'GitOps workflow implementado',
      'Pre-commit hooks para validación',
      'Terraform fmt, validate y lint',
      'Migración de infraestructura existente',
      'Capacitación del equipo en IaC'
    ],
    technologies: [
      'Terraform',
      'AWS',
      'Azure',
      'Google Cloud',
      'GitHub Actions',
      'GitLab CI',
      'Azure DevOps',
      'Terraform Cloud',
      'Sentinel',
      'Terratest',
      'Docker',
      'Kubernetes',
      'Helm',
      'Ansible',
      'Python',
      'Go'
    ],
    price: {
      type: 'project',
      amount: 6800,
      currency: 'USD',
      period: 'por proyecto'
    },
    deliveryTime: '10-14 semanas',
    featured: true,
    available: true,
    imageUrl: '/images/iac-terraform.jpg'
  }
];
