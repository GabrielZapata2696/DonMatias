import { ServiceCard } from '../interfaces/service-card.interface';

/**
 * Static data for service cards
 * Contains all the service information displayed in the application
 */
export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'servicios-integrales',
    title: 'Servicios Integrales de Consultoría',
    category: 'Consultoría Especializada',
    content: 'Ofrecemos servicios integrales de consultoría territorial, interventoría técnica y gestión documental para el desarrollo sostenible de los municipios y la optimización de procesos administrativos.',
    icon: 'business_center',
    features: [
      'Consultoría Territorial y Ordenamiento',
      'Interventoría Técnica de Obras',
      'Gestión Documental y Archivo',
      'Fortalecimiento Institucional',
      'Supervisión Financiera y Ambiental',
      'Asesoría Normativa',
      'Sistemas de Información',
      'Digitalización de Procesos'
    ],
    highlight: 'Soluciones integrales para el desarrollo territorial y administrativo',
    image: 'consultoria-territorial-1.jpg',
    images: [ 'consultoria-territorial-1.jpg', 'consultoria-territorial-2.jpg' ]
  },
  {
    id: 'proyectos-vivienda-optimizacion',
    title: 'Proyectos de Vivienda y Optimización Urbana',
    category: 'Desarrollo Urbano Integral',
    content: 'Desarrollo integral que combina proyectos de vivienda de interés social como "Miriam Madrid" con la modernización de redes de acueducto y alcantarillado, creando comunidades sostenibles con servicios públicos eficientes.',
    icon: 'location_city',
    features: [
      'Vivienda de Interés Social',
      'Diseño Arquitectónico',
      'Zonas Verdes y Espacios Comunitarios',
      'Redes de Acueducto',
      'Sistemas de Alcantarillado',
      'Optimización Hidráulica',
      'Modernización Tecnológica',
      'Sostenibilidad Ambiental'
    ],
    highlight: 'Desarrollo urbano integral: vivienda digna y servicios públicos eficientes',
    image: 'proyectos_1.jpg',
    images: [ 'proyectos_1.jpg', 'proyectos_2.jpg', 'proyectos_3.jpg', 'proyectos_4.jpg', 'proyectos_5.jpg', 'proyectos_6.jpg' ]
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
    image: 'infraestructura_1.jpg',
    images: [ 'infraestructura_1.jpg', 'infraestructura_2.jpg', 'infraestructura_3.jpg', 'infraestructura_4.jpg', 'infraestructura_5.jpg', 'infraestructura_6.jpg', 'infraestructura_7.jpg' ]
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
  return [ ...new Set(SERVICES_DATA.map(service => service.category)) ];
};
