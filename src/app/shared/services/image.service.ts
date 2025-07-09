import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly baseUrl = environment.imageBaseUrl;

  constructor() { }

  /**
   * Get full URL for an image
   * @param imagePath - Relative path to the image (e.g., 'main-construction-project.webp')
   * @returns Full URL to the image
   */
  getImageUrl(imagePath: string): string {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Remove 'imagenes/' prefix if present (for backward compatibility)
    const pathWithoutPrefix = cleanPath.startsWith('imagenes/') 
      ? cleanPath.replace('imagenes/', '') 
      : cleanPath;
    
    return `${this.baseUrl}/${pathWithoutPrefix}`;
  }

  /**
   * Get URL for main project images
   * @param imageName - Name of the image without extension
   * @param extension - Image extension (default: 'webp')
   * @returns Full URL to the image
   */
  getMainProjectImage(imageName: string, extension: string = 'webp'): string {
    return this.getImageUrl(`${imageName}.${extension}`);
  }

  /**
   * Get URL for ally/partner images
   * @param imageName - Name of the image file
   * @returns Full URL to the image
   */
  getAllyImage(imageName: string): string {
    return this.getImageUrl(`empresas_aliadas/${imageName}`);
  }

  /**
   * Get URL for optimized images
   * @param imageName - Name of the image file
   * @returns Full URL to the optimized image
   */
  getOptimizedImage(imageName: string): string {
    return this.getImageUrl(`optimized/${imageName}`);
  }

  /**
   * Get responsive image URLs for different screen sizes
   * @param baseName - Base name of the image without extension
   * @param extension - Image extension (default: 'webp')
   * @returns Object with URLs for different sizes
   */
  getResponsiveImages(baseName: string, extension: string = 'webp') {
    return {
      full: this.getImageUrl(`${baseName}.${extension}`),
      thumb: this.getOptimizedImage(`${baseName}-thumb.${extension}`),
      thumbSmall: this.getOptimizedImage(`${baseName}-thumb-thumb.${extension}`)
    };
  }

  /**
   * Preload an image to improve performance
   * @param imagePath - Path to the image
   * @returns Promise that resolves when image is loaded
   */
  preloadImage(imagePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
      img.src = this.getImageUrl(imagePath);
    });
  }

  /**
   * Get fallback image URL
   * @returns URL to fallback image
   */
  getFallbackImageUrl(): string {
    return 'https://placehold.co/1600x900/cccccc/666666?text=Image+Not+Available';
  }
}
