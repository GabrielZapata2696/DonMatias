import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { interval, Subscription } from 'rxjs';

interface SlideImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: [ './image-slider.component.css' ],
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatButtonModule ]
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  // Fallback image for error handling - using direct image URL
  fallbackImageUrl = 'https://placehold.co/1600x900/cccccc/666666?text=Image+Not+Available';

  // Sample images array with placeholder URLs (replace with your actual images when ready)
  images: SlideImage[] = [
    {
      src: 'imagenes/construction-project.png',
      alt: 'Construction Project Image - Modern building development'
    },
    {
      src: 'imagenes/main-construction-project.png',
      alt: 'Main Construction Project - Large scale development'
    },
    {
      src: 'imagenes/main-park-project.png',
      alt: 'Main Park Project - Urban green space development'
    },
    {
      src: 'imagenes/main-road-project.png',
      alt: 'Main Road Project - Infrastructure development'
    },
    {
      src: 'imagenes/park-project.png',
      alt: 'Park Project - Community space development'
    },
    {
      src: 'imagenes/pipe-project.png',
      alt: 'Pipe Project - Utility infrastructure'
    },
    {
      src: 'imagenes/road-project.png',
      alt: 'Road Project - Transportation infrastructure'
    }
  ];


  currentIndex = 0;
  autoPlayInterval = 5000; // 5 segundos
  autoPlayEnabled = true;
  isPaused = false;

  // Touch handling variables
  touchStartX = 0;
  touchEndX = 0;
  minSwipeDistance = 50;

  // For cleanup
  private autoPlaySubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.preloadImages();
    this.startAutoPlay();
  }

  // Add preloading mechanism for smoother transitions
  private preloadImages(): void {
    this.images.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Navigation methods
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.resetAutoPlay();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  // Auto-play controls
  startAutoPlay(): void {
    if (this.autoPlayEnabled && !this.isPaused && !this.autoPlaySubscription) {
      this.autoPlaySubscription = interval(this.autoPlayInterval)
        .subscribe(() => {
          if (!this.isPaused) {
            this.nextSlide();
          }
        });
    }
  }

  stopAutoPlay(): void {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
      this.autoPlaySubscription = undefined;
    }
  }

  resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  pauseAutoPlay(): void {
    this.isPaused = true;
  }

  resumeAutoPlay(): void {
    this.isPaused = false;
  }

  // Event listeners
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.pauseAutoPlay();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.resumeAutoPlay();
  }

  // Touch event handlers for mobile swipe
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[ 0 ].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[ 0 ].clientX;
  }

  onTouchEnd(): void {
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right - go to previous slide
        this.prevSlide();
      } else {
        // Swiped left - go to next slide
        this.nextSlide();
      }
    }

    // Reset values
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  // Method to handle image loading errors
  handleImageError(event: Event): void {
    if (event.target) {
      const imgElement = event.target as HTMLImageElement;
      // Set a fallback image from an online placeholder service
      imgElement.src = this.fallbackImageUrl;
      // Add a class to indicate error state
      imgElement.classList.add('img-error');
      // Remove loading state if present
      const loadingElement = imgElement.parentElement?.querySelector('.slide-loading');
      if (loadingElement) {
        loadingElement.remove();
      }
    }
  }
}

