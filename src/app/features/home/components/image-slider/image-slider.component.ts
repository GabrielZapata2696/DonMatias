import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { interval, Subscription } from 'rxjs';

interface SlideImage {
  src: string;
  srcWebp: string;
  srcMobile: string;
  srcMobileWebp: string;
  alt: string;
  loaded?: boolean;
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

  // Optimized images with WebP format for better performance
  images: SlideImage[] = [
    {
      src: 'imagenes/optimized/construction-project.jpg',
      srcWebp: 'imagenes/optimized/construction-project.webp',
      srcMobile: 'imagenes/optimized/construction-project-thumb.jpg',
      srcMobileWebp: 'imagenes/optimized/construction-project-thumb.webp',
      alt: 'Construction Project Image - Modern building development',
      loaded: false
    },
    {
      src: 'imagenes/optimized/main-construction-project.jpg',
      srcWebp: 'imagenes/optimized/main-construction-project.webp',
      srcMobile: 'imagenes/optimized/main-construction-project-thumb.jpg',
      srcMobileWebp: 'imagenes/optimized/main-construction-project-thumb.webp',
      alt: 'Main Construction Project - Large scale development',
      loaded: false
    },
    {
      src: 'imagenes/optimized/main-park-project.jpg',
      srcWebp: 'imagenes/optimized/main-park-project.webp',
      srcMobile: 'imagenes/optimized/main-park-project-thumb.jpg',
      srcMobileWebp: 'imagenes/optimized/main-park-project-thumb.webp',
      alt: 'Main Park Project - Urban green space development',
      loaded: false
    },
    {
      src: 'imagenes/optimized/main-road-project.jpg',
      srcWebp: 'imagenes/optimized/main-road-project.webp',
      srcMobile: 'imagenes/optimized/main-road-project-thumb.jpg',
      srcMobileWebp: 'imagenes/optimized/main-road-project-thumb.webp',
      alt: 'Main Road Project - Infrastructure development',
      loaded: false
    },
    {
      src: 'imagenes/optimized/park-project.jpg',
      srcWebp: 'imagenes/optimized/park-project.webp',
      srcMobile: 'imagenes/optimized/park-project-thumb.jpg',
      srcMobileWebp: 'imagenes/optimized/park-project-thumb.webp',
      alt: 'Park Project - Community space development',
      loaded: false
    },
    {
      src: 'imagenes/optimized/pipe-project.jpg',
      srcWebp: 'imagenes/optimized/pipe-project.webp',
      srcMobile: 'imagenes/optimized/pipe-project-thumb.jpg',
      srcMobileWebp: 'imagenes/optimized/pipe-project-thumb.webp',
      alt: 'Pipe Project - Utility infrastructure',
      loaded: false
    },
    {
      src: 'imagenes/optimized/road-project.jpg',
      srcWebp: 'imagenes/optimized/road-project.webp',
      srcMobile: 'imagenes/optimized/road-project-thumb.jpg',
      srcMobileWebp: 'imagenes/optimized/road-project-thumb.webp',
      alt: 'Road Project - Transportation infrastructure',
      loaded: false
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
    // Mark first image as high priority and start loading immediately
    this.loadCriticalImages();
    this.preloadImages();
    this.startAutoPlay();
  }
  
  // Load critical images immediately for better UX
  private loadCriticalImages(): void {
    // Load first image immediately (critical)
    this.aggressivePreloadImage(0);
    
    // Load second image shortly after
    setTimeout(() => {
      this.aggressivePreloadImage(1);
    }, 100);
    
    // Load third image
    setTimeout(() => {
      this.aggressivePreloadImage(2);
    }, 300);
  }
  
  private aggressivePreloadImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    
    const image = this.images[index];
    const isMobile = window.innerWidth <= 768;
    
    // Create multiple image objects for parallel loading
    const imagesToLoad = [];
    
    if (isMobile) {
      // Load mobile versions
      const mobileWebp = new Image();
      mobileWebp.src = image.srcMobileWebp;
      imagesToLoad.push(mobileWebp);
      
      const mobileJpeg = new Image();
      mobileJpeg.src = image.srcMobile;
      imagesToLoad.push(mobileJpeg);
    } else {
      // Load desktop versions
      const desktopWebp = new Image();
      desktopWebp.src = image.srcWebp;
      imagesToLoad.push(desktopWebp);
      
      const desktopJpeg = new Image();
      desktopJpeg.src = image.src;
      imagesToLoad.push(desktopJpeg);
    }
    
    // Mark as loaded when any version loads
    const markLoaded = () => {
      this.images[index].loaded = true;
    };
    
    imagesToLoad.forEach(img => {
      img.onload = markLoaded;
      img.onerror = () => {
        console.warn(`Failed to load image ${index}:`, img.src);
      };
    });
  }

  // Enhanced preloading mechanism for smoother transitions
  private preloadImages(): void {
    // Preload first image immediately
    this.preloadImage(0);
    
    // Preload next few images for better UX
    setTimeout(() => {
      for (let i = 1; i < Math.min(3, this.images.length); i++) {
        this.preloadImage(i);
      }
    }, 500);
    
    // Preload remaining images after initial load
    setTimeout(() => {
      for (let i = 3; i < this.images.length; i++) {
        this.preloadImage(i);
      }
    }, 2000);
  }
  
  private preloadImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    
    const image = this.images[index];
    
    // Preload WebP version
    const webpImg = new Image();
    webpImg.src = image.srcWebp;
    
    // Preload JPEG fallback
    const jpegImg = new Image();
    jpegImg.src = image.src;
    
    // Preload mobile versions
    const mobileWebpImg = new Image();
    mobileWebpImg.src = image.srcMobileWebp;
    
    const mobileJpegImg = new Image();
    mobileJpegImg.src = image.srcMobile;
    
    // Mark as loaded when main image loads
    webpImg.onload = () => {
      this.images[index].loaded = true;
    };
    
    jpegImg.onload = () => {
      this.images[index].loaded = true;
    };
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Navigation methods
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.preloadAdjacentImages();
    this.resetAutoPlay();
  }

  onImageLoad(index: number): void {
    this.images[index].loaded = true;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.preloadAdjacentImages();
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.preloadAdjacentImages();
    this.resetAutoPlay();
  }
  
  // Preload images adjacent to current slide for smoother transitions
  private preloadAdjacentImages(): void {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    
    // Preload next and previous images if not already loaded
    if (!this.images[nextIndex].loaded) {
      this.preloadImage(nextIndex);
    }
    if (!this.images[prevIndex].loaded) {
      this.preloadImage(prevIndex);
    }
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

