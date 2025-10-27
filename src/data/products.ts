import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'web-development',
    name: 'Desarrollo Web Full-Stack',
    description: 'Aplicación web completa con frontend moderno y backend robusto',
    price: 2500,
    currency: 'USD',
    category: 'development',
    deliveryTime: '4-6 semanas',
    features: [
      'Frontend responsivo con React/Angular/Vue',
      'Backend con Node.js/Python/Java',
      'Base de datos optimizada',
      'API RESTful completa',
      'Autenticación y autorización',
      'Panel de administración',
      'Hosting y dominio incluido',
      '3 meses de soporte gratuito'
    ],
    featured: false
  },
  {
    id: 'mobile-app',
    name: 'Aplicación Móvil',
    description: 'App nativa o multiplataforma para iOS y Android',
    price: 3500,
    currency: 'USD',
    category: 'development',
    deliveryTime: '6-8 semanas',
    features: [
      'Desarrollo multiplataforma (React Native/Flutter)',
      'Diseño UI/UX optimizado',
      'Integración con APIs',
      'Notificaciones push',
      'Almacenamiento local',
      'Publicación en App Store y Google Play',
      'Documentación completa',
      '6 meses de soporte gratuito'
    ],
    featured: true
  },
  {
    id: 'consulting',
    name: 'Consultoría Técnica',
    description: 'Asesoría especializada en arquitectura y tecnología',
    price: 150,
    currency: 'USD',
    category: 'consulting',
    deliveryTime: '1-2 semanas',
    features: [
      'Auditoría de código y arquitectura',
      'Recomendaciones de mejora',
      'Plan de migración tecnológica',
      'Documentación técnica',
      'Sesiones de mentoría',
      'Revisión de seguridad',
      'Optimización de rendimiento',
      'Seguimiento post-consultoría'
    ],
    featured: false
  },
  {
    id: 'database-design',
    name: 'Diseño de Base de Datos',
    description: 'Diseño e implementación de bases de datos escalables',
    price: 800,
    currency: 'USD',
    category: 'development',
    deliveryTime: '2-3 semanas',
    features: [
      'Modelado de datos optimizado',
      'Implementación SQL/NoSQL',
      'Índices y optimización',
      'Procedimientos almacenados',
      'Sistema de backup',
      'Documentación del esquema',
      'Scripts de migración',
      'Capacitación del equipo'
    ],
    featured: false
  },
  {
    id: 'devops-setup',
    name: 'Configuración DevOps',
    description: 'Implementación de CI/CD y infraestructura como código',
    price: 1500,
    currency: 'USD',
    category: 'development',
    deliveryTime: '3-4 semanas',
    features: [
      'Pipeline CI/CD automatizado',
      'Contenedorización con Docker',
      'Orquestación con Kubernetes',
      'Monitoreo y logging',
      'Infraestructura como código',
      'Automatización de despliegues',
      'Configuración de seguridad',
      'Documentación de procesos'
    ],
    featured: false
  },
  {
    id: 'technical-training',
    name: 'Capacitación Técnica',
    description: 'Formación personalizada para equipos de desarrollo',
    price: 600,
    currency: 'USD',
    category: 'training',
    deliveryTime: '1-2 semanas',
    features: [
      'Workshops personalizados',
      'Material didáctico incluido',
      'Ejercicios prácticos',
      'Evaluación de competencias',
      'Certificado de participación',
      'Sesiones de Q&A',
      'Recursos adicionales',
      'Seguimiento post-capacitación'
    ],
    featured: false
  }
];
