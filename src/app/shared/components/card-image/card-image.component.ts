import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-image',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './card-image.component.html',
  styleUrl: './card-image.component.css'
})
export class CardImageComponent {
  @Input() origen = '';
  @Input() imagen = '';
  @Input() titulo = '';

  // Image loading state management
  imageLoaded = false;
  imageError = false;
  fallbackImage = 'https://placehold.co/600x400/e0e0e0/666666?text=Imagen+No+Disponible';

  /**
   * Handle image loading success
   */
  onImageLoad(event: Event): void {
    this.imageLoaded = true;
    this.imageError = false;
    const imgElement = event.target as HTMLImageElement;
    imgElement.classList.add('loaded');
  }

  /**
   * Handle image loading error with fallback
   */
  onImageError(event: Event): void {
    this.imageError = true;
    this.imageLoaded = false;
    const imgElement = event.target as HTMLImageElement;
    
    // Set fallback image
    imgElement.src = this.fallbackImage;
    imgElement.alt = 'Imagen no disponible';
    imgElement.classList.add('error-state');
    
    console.warn(`Failed to load image: ${this.imagen}`);
  }

  /**
   * Get optimized image source based on format support
   */
  getOptimizedImageSrc(): string {
    if (!this.imagen) {
      return this.fallbackImage;
    }
    return this.imagen;
  }

  /**
   * Check if image format is WebP
   */
  isWebPFormat(): boolean {
    return this.imagen.toLowerCase().includes('.webp');
  }

  /**
   * Get appropriate alt text based on context
   */
  getAltText(): string {
    if (this.origen === 'home') {
      return 'Proyecto de infraestructura DONMATÍAS - Desarrollo territorial';
    }
    return this.titulo ? `Imagen del proyecto: ${this.titulo}` : 'Imagen del proyecto';
  }
}
