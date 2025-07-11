/**
 * Interface for Service Card data structure
 * Defines the properties required for each service card in the application
 */
export interface ServiceCard {
  /** Main title of the service */
  title: string;
  
  /** Category or type of service */
  category: string;
  
  /** Detailed description of the service */
  content: string;
  
  /** Material icon name for the service */
  icon: string;
  
  /** List of key features or capabilities */
  features: string[];
  
  /** Highlighted phrase or unique selling point */
  highlight: string;
}

/**
 * Display mode for service cards
 */
export type DisplayMode = 'grid' | 'slider';
