import { ServiceCard } from '../interfaces/service-card.interface';

/**
 * Static data for service cards
 * Contains all the service information displayed in the application
 */
export const SERVICES_DATA: ServiceCard[] = [
  {
    title: 'Consultoría Territorial',
    category: 'Planificación Urbana',
    content: 'Planeación urbana, ordenamiento territorial y fortalecimiento institucional para el desarrollo sostenible de los municipios.',
    icon: 'location_city',
    features: [
      'Planes de Ordenamiento Territorial',
      'Estudios de Factibilidad',
      'Fortalecimiento Institucional',
      'Asesoría Normativa'
    ],
    highlight: 'Experiencia comprobada en desarrollo territorial'
  },
  {
    title: 'Interventoría Técnica',
    category: 'Supervisión de Obras',
    content: 'Supervisión técnica, contable, financiera y ambiental de obras públicas garantizando calidad y cumplimiento.',
    icon: 'engineering',
    features: [
      'Control de Calidad',
      'Supervisión Financiera',
      'Seguimiento Ambiental',
      'Informes Técnicos'
    ],
    highlight: 'Garantía de calidad en cada proyecto'
  },
  {
    title: 'Proyectos de Vivienda',
    category: 'Vivienda de Interés Social',
    content: 'Proyecto "Miriam Madrid" – 11 viviendas VIS con zonas verdes y espacio comunitario, mejorando la calidad de vida.',
    icon: 'home',
    features: [
      'Diseño Arquitectónico',
      'Zonas Verdes',
      'Espacios Comunitarios',
      'Sostenibilidad Ambiental'
    ],
    highlight: 'Transformando comunidades con vivienda digna'
  },
  {
    title: 'Infraestructura y Vías',
    category: 'Conectividad Rural',
    content: 'Construcción de pavimento, mantenimiento vial y conectividad rural en Antioquia para mejorar la movilidad.',
    icon: 'construction',
    features: [
      'Pavimentación',
      'Mantenimiento Vial',
      'Conectividad Rural',
      'Señalización'
    ],
    highlight: 'Conectando territorios, generando oportunidades'
  },
  {
    title: 'Gestión Documental',
    category: 'Sistemas de Información',
    content: 'Asesoría administrativa, sistemas de información y archivo para entidades territoriales optimizando procesos.',
    icon: 'description',
    features: [
      'Organización Documental',
      'Sistemas de Archivo',
      'Digitalización',
      'Capacitación'
    ],
    highlight: 'Modernizando la gestión administrativa'
  },
  {
    title: 'Optimización Urbana',
    category: 'Servicios Públicos',
    content: 'Diseño y modernización de redes de acueducto y alcantarillado para mejorar la prestación de servicios.',
    icon: 'plumbing',
    features: [
      'Redes de Acueducto',
      'Sistemas de Alcantarillado',
      'Optimización Hidráulica',
      'Modernización Tecnológica'
    ],
    highlight: 'Servicios públicos eficientes y sostenibles'
  }
];

/**
 * Get services data
 * @returns Array of ServiceCard objects
 */
export const getServicesData = (): ServiceCard[] => {
  return SERVICES_DATA;
};

/**
 * Get a specific service by title
 * @param title - The title of the service to find
 * @returns ServiceCard object or undefined if not found
 */
export const getServiceByTitle = (title: string): ServiceCard | undefined => {
  return SERVICES_DATA.find(service => service.title === title);
};

/**
 * Get services by category
 * @param category - The category to filter by
 * @returns Array of ServiceCard objects matching the category
 */
export const getServicesByCategory = (category: string): ServiceCard[] => {
  return SERVICES_DATA.filter(service => service.category === category);
};

/**
 * Get all unique categories
 * @returns Array of unique category strings
 */
export const getServiceCategories = (): string[] => {
  return [...new Set(SERVICES_DATA.map(service => service.category))];
};
