import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ImageViewerData {
  images: string[];
  currentIndex: number;
  title: string;
}

@Component({
  selector: 'app-fullscreen-image-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './fullscreen-image-viewer.component.html',
  styleUrls: ['./fullscreen-image-viewer.component.scss']
})
export class FullscreenImageViewerComponent implements OnInit {
  currentIndex: number = 0;
  images: string[] = [];
  title: string = '';
  imageBasePath: string = '/assets/images/servicios/';
  isMainImageLoaded: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FullscreenImageViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageViewerData
  ) {}

  ngOnInit(): void {
    this.images = this.data.images || [];
    this.currentIndex = this.data.currentIndex || 0;
    this.title = this.data.title || '';
    this.isMainImageLoaded = false;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  goToPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
    this.isMainImageLoaded = false;
  }

  goToNext(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.isMainImageLoaded = false;
  }

  goToImage(index: number): void {
    this.currentIndex = index;
    this.isMainImageLoaded = false;
  }

  getCurrentImagePath(): string {
    return this.imageBasePath + this.images[this.currentIndex];
  }

  onMainImageLoad(): void {
    this.isMainImageLoaded = true;
  }

  onMainImageError(event: any): void {
    console.warn('Main image failed to load:', this.getCurrentImagePath());
    this.isMainImageLoaded = true; // Hide skeleton even on error
  }

  onImageError(event: any): void {
    // Handle thumbnail image load error
    console.warn('Thumbnail image failed to load:', event.target.src);
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.goToPrevious();
        break;
      case 'ArrowRight':
        this.goToNext();
        break;
      case 'Escape':
        this.onClose();
        break;
    }
  }
}
