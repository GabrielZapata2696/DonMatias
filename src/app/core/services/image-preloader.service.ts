import { Injectable } from '@angular/core';

interface PreloadableImage {
  src: string;
  srcWebp?: string;
  srcMobile?: string;
  srcMobileWebp?: string;
  priority?: 'high' | 'medium' | 'low';
}

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  private loadedImages = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  constructor() { }

  /**
   * Preload a single image with WebP support detection
   */
  async preloadImage(image: PreloadableImage): Promise<void> {
    const cacheKey = this.getCacheKey(image);
    
    if (this.loadedImages.has(cacheKey)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    const loadPromise = this.loadImageWithFallback(image);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      await loadPromise;
      this.loadedImages.add(cacheKey);
    } catch (error) {
      console.warn('Failed to preload image:', cacheKey, error);
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

  /**
   * Preload multiple images with priority handling
   */
  async preloadImages(images: PreloadableImage[]): Promise<void> {
    // Sort by priority
    const sortedImages = images.sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 };
      return (priorities[b.priority || 'medium'] - priorities[a.priority || 'medium']);
    });

    // Load high priority images first
    const highPriorityImages = sortedImages.filter(img => img.priority === 'high');
    await Promise.all(highPriorityImages.map(img => this.preloadImage(img)));

    // Load medium priority images
    const mediumPriorityImages = sortedImages.filter(img => img.priority === 'medium' || !img.priority);
    setTimeout(() => {
      Promise.all(mediumPriorityImages.map(img => this.preloadImage(img)));
    }, 100);

    // Load low priority images last
    const lowPriorityImages = sortedImages.filter(img => img.priority === 'low');
    setTimeout(() => {
      Promise.all(lowPriorityImages.map(img => this.preloadImage(img)));
    }, 500);
  }

  /**
   * Check if WebP is supported
   */
  private async isWebPSupported(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Check if device is mobile based on screen size
   */
  private isMobileDevice(): boolean {
    return window.innerWidth <= 768;
  }

  /**
   * Load image with WebP and mobile fallback
   */
  private async loadImageWithFallback(image: PreloadableImage): Promise<void> {
    const isMobile = this.isMobileDevice();
    const supportsWebP = await this.isWebPSupported();

    // Determine the best image source
    let imageSrc: string;
    
    if (isMobile) {
      if (supportsWebP && image.srcMobileWebp) {
        imageSrc = image.srcMobileWebp;
      } else if (image.srcMobile) {
        imageSrc = image.srcMobile;
      } else {
        imageSrc = image.src;
      }
    } else {
      if (supportsWebP && image.srcWebp) {
        imageSrc = image.srcWebp;
      } else {
        imageSrc = image.src;
      }
    }

    return this.loadSingleImage(imageSrc);
  }

  /**
   * Load a single image and return a promise
   */
  private loadSingleImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      
      // Set attributes for better loading
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = src;
    });
  }

  /**
   * Get cache key for an image
   */
  private getCacheKey(image: PreloadableImage): string {
    return `${image.src}-${image.srcWebp || ''}-${image.srcMobile || ''}-${image.srcMobileWebp || ''}`;
  }

  /**
   * Check if an image is already loaded
   */
  isImageLoaded(image: PreloadableImage): boolean {
    const cacheKey = this.getCacheKey(image);
    return this.loadedImages.has(cacheKey);
  }

  /**
   * Clear the cache (useful for memory management)
   */
  clearCache(): void {
    this.loadedImages.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { loaded: number; loading: number } {
    return {
      loaded: this.loadedImages.size,
      loading: this.loadingPromises.size
    };
  }
}
