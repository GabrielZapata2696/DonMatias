import { ServiceCard } from '../interfaces/service-card.interface';

/**
 * Static data for service cards
 * Contains all the service information displayed in the application
 */
export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'consultoria-territorial',
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
    highlight: 'Experiencia comprobada en desarrollo territorial',
    image: 'consultoria-territorial.jpg',
    images: ['consultoria-territorial-1.jpg', 'consultoria-territorial-2.jpg', 'consultoria-territorial-3.jpg']
  },
  {
    id: 'interventoria-tecnica',
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
    highlight: 'Garantía de calidad en cada proyecto',
    image: 'interventoria-tecnica.jpg',
    images: ['interventoria-tecnica-1.jpg', 'interventoria-tecnica-2.jpg', 'interventoria-tecnica-3.jpg']
  },
  {
    id: 'proyectos-vivienda',
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
    highlight: 'Transformando comunidades con vivienda digna',
    image: 'proyectos-vivienda.jpg',
    images: ['proyectos-vivienda-1.jpg', 'proyectos-vivienda-2.jpg', 'proyectos-vivienda-3.jpg']
  },
  {
    id: 'infraestructura-vias',
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
    highlight: 'Conectando territorios, generando oportunidades',
    image: 'infraestructura-vias.jpg',
    images: ['infraestructura-vias-1.jpg', 'infraestructura-vias-2.jpg', 'infraestructura-vias-3.jpg']
  },
  {
    id: 'gestion-documental',
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
    highlight: 'Modernizando la gestión administrativa',
    image: 'gestion-documental.jpg',
    images: ['gestion-documental-1.jpg', 'gestion-documental-2.jpg', 'gestion-documental-3.jpg']
  },
  {
    id: 'optimizacion-urbana',
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
    highlight: 'Servicios públicos eficientes y sostenibles',
    image: 'optimizacion-urbana.jpg',
    images: ['optimizacion-urbana-1.jpg', 'optimizacion-urbana-2.jpg', 'optimizacion-urbana-3.jpg']
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
 * Get a specific service by ID
 * @param id - The ID of the service to find
 * @returns ServiceCard object or undefined if not found
 */
export const getServiceById = (id: string): ServiceCard | undefined => {
  return SERVICES_DATA.find(service => service.id === id);
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
