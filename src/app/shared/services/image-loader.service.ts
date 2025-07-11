import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {
  private readonly SERVICES_IMAGE_PATH = 'assets/images/servicios/';
  private readonly PLACEHOLDER_IMAGE = 'assets/images/placeholder-service.jpg';

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
    return `${this.SERVICES_IMAGE_PATH}${imageName}`;
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
