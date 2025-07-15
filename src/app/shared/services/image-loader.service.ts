import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {
  private readonly SERVICES_IMAGE_PATHS = {
    asesoria: 'imagenes/portafolio_servicios/asesoria/',
    vivienda: 'imagenes/portafolio_servicios/opti_urbana_y_vivienda/',
    infraestructura: 'imagenes/portafolio_servicios/infraestructura_y_vias/'
  };
  
  private readonly NETLIFY_IMAGE_PATHS = {
    asesoria: 'https://donmatias-external-images.netlify.app/portafolio_servicios/asesoria/',
    vivienda: 'https://donmatias-external-images.netlify.app/portafolio_servicios/opti_urbana_y_vivienda/',
    infraestructura: 'https://donmatias-external-images.netlify.app/portafolio_servicios/infraestructura_y_vias/'
  };
  
  private readonly PLACEHOLDER_IMAGE = 'assets/images/placeholder-service.jpg';

  private getImageCategory(imageName: string): 'asesoria' | 'vivienda' | 'infraestructura' {
    // Images starting with 'proyectos_' or 'vivienda_' are in the vivienda folder
    if (imageName.startsWith('proyectos_') || imageName.startsWith('vivienda_') || imageName.startsWith('optimizacion_')) {
      return 'vivienda';
    }
    // Images starting with 'infraestructura_' are in the infraestructura folder
    if (imageName.startsWith('infraestructura_')) {
      return 'infraestructura';
    }
    // Default to asesoria folder
    return 'asesoria';
  }

  getCurrentImagePath(imageName: string): string {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168');
    const category = this.getImageCategory(imageName);
    
    if (isLocal) {
      return `${this.SERVICES_IMAGE_PATHS[category]}${imageName}`;
    } else {
      return `${this.NETLIFY_IMAGE_PATHS[category]}${imageName}`;
    }
  }

  constructor() { }

  /**
   * Get the full path for a service image
   * @param imageName - The image filename
   * @returns The full path to the image
   */
  getServiceImagePath(imageName?: string): string {
    if (!imageName) {
      return this.PLACEHOLDER_IMAGE;
    }
    return this.getCurrentImagePath(imageName);
  }

  /**
   * Check if an image exists and load it with fallback
   * @param imageName - The image filename
   * @returns Promise that resolves to the image path
   */
  async loadImageWithFallback(imageName?: string): Promise<string> {
    if (!imageName) {
      return this.PLACEHOLDER_IMAGE;
    }

    const imagePath = this.getServiceImagePath(imageName);
    
    try {
      await this.checkImageExists(imagePath);
      return imagePath;
    } catch {
      return this.PLACEHOLDER_IMAGE;
    }
  }

  /**
   * Check if an image exists
   * @param imagePath - The path to the image
   * @returns Promise that resolves if image exists, rejects if not
   */
  private checkImageExists(imagePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = imagePath;
    });
  }

  /**
   * Get placeholder image path
   * @returns The placeholder image path
   */
  getPlaceholderImage(): string {
    return this.PLACEHOLDER_IMAGE;
  }
}
