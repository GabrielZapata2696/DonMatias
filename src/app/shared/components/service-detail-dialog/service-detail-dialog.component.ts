import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ServiceCard } from '../../interfaces/service-card.interface';
import { FullscreenImageViewerComponent, ImageViewerData } from '../fullscreen-image-viewer/fullscreen-image-viewer.component';

@Component({
  selector: 'app-service-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './service-detail-dialog.component.html',
  styleUrls: ['./service-detail-dialog.component.scss']
})
export class ServiceDetailDialogComponent {
  imageBasePath: string = '/assets/images/servicios/';
  imageLoadedStates: { [key: number]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<ServiceDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceCard,
    private router: Router,
    private dialog: MatDialog
  ) {
    // Initialize all images as not loaded
    if (this.data.images) {
      this.data.images.forEach((_, index) => {
        this.imageLoadedStates[index] = false;
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onContact(): void {
    // Close the dialog first
    this.dialogRef.close();
    // Navigate to contact page
    this.router.navigate(['/contacto']);
  }

  /**
   * Check if service has images to display
   */
  hasImages(): boolean {
    return !!(this.data.images && this.data.images.length > 0);
  }

  /**
   * Get the complete image path for a given image filename
   */
  getImagePath(imageName: string): string {
    return this.imageBasePath + imageName;
  }

  /**
   * Open fullscreen image viewer
   */
  openImageViewer(startIndex: number = 0): void {
    if (!this.hasImages()) {
      return;
    }

    const imageViewerData: ImageViewerData = {
      images: this.data.images || [],
      currentIndex: startIndex,
      title: this.data.title
    };

    this.dialog.open(FullscreenImageViewerComponent, {
      data: imageViewerData,
      panelClass: 'fullscreen-dialog',
      hasBackdrop: true,
      disableClose: false,
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh'
    });
  }

  /**
   * Check if a specific image is loaded
   */
  isImageLoaded(index: number): boolean {
    return this.imageLoadedStates[index] || false;
  }

  /**
   * Handle successful image load
   */
  onImageLoad(index: number): void {
    this.imageLoadedStates[index] = true;
  }

  /**
   * Handle image load error
   */
  onImageError(event: any, index?: number): void {
    console.warn('Image failed to load:', event.target.src);
    
    // Mark as "loaded" to hide skeleton and show error state if needed
    if (index !== undefined) {
      this.imageLoadedStates[index] = true;
    }
    
    // You could implement a fallback image here
    // event.target.src = 'assets/images/fallback-image.jpg';
  }
}
