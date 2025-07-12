import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

// Import from external files
import { ServiceCard, DisplayMode } from '../../interfaces';
import { getServicesData } from '../../data';
import { ServiceDetailDialogComponent } from '../service-detail-dialog/service-detail-dialog.component';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-service-grid',
  templateUrl: './service-grid.component.html',
  styleUrls: [ './service-grid.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ServiceGridComponent implements OnInit, OnDestroy {
  @Input() displayMode: DisplayMode = 'grid';
  @Input() services: ServiceCard[] = [];

  // Slider navigation properties
  currentIndex = 0;
  currentTranslateX = 0;
  cardWidth = 50; // Percentage width per card
  cardSpacing = 1.5; // rem units for margin + gap
  visibleCards = 2; // Default to 2 cards visible

  // Touch handling variables
  touchStartX = 0;
  touchEndX = 0;
  minSwipeDistance = 50;

  // Image loading state management
  imageLoading: { [key: string]: boolean } = {};
  imageError: { [key: string]: boolean } = {};

  // Default services loaded from external data file
  private defaultServices: ServiceCard[] = getServicesData();

  constructor(
    private dialog: MatDialog,
    private imageLoaderService: ImageLoaderService
  ) {}

  // Get services to display (input or default)
  get servicesToDisplay(): ServiceCard[] {
    return this.services.length > 0 ? this.services : this.defaultServices;
  }

  // For slider mode - duplicate the array to create seamless loop
  get duplicatedServices(): ServiceCard[] {
    const services = this.servicesToDisplay;
    return [ ...services, ...services ];
  }

  // Use cards for backward compatibility
  get cards(): ServiceCard[] {
    return this.displayMode === 'slider' ? this.duplicatedServices : this.servicesToDisplay;
  }

  // Get max index for navigation
  get maxIndex(): number {
    return Math.max(0, this.servicesToDisplay.length - this.visibleCards);
  }

  // Navigation methods
  navigate(direction: number): void {
    if (this.displayMode !== 'slider') return;

    const newIndex = this.currentIndex + direction;

    if (newIndex >= 0 && newIndex <= this.maxIndex) {
      this.currentIndex = newIndex;
      this.updateTransform();
    }
  }

  // Slide navigation methods (similar to header slider)
  nextSlide(): void {
    if (this.displayMode !== 'slider') return;
    
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateTransform();
    }
  }

  prevSlide(): void {
    if (this.displayMode !== 'slider') return;
    
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
    }
  }

  goToSlide(index: number): void {
    if (this.displayMode !== 'slider') return;

    if (index >= 0 && index <= this.maxIndex) {
      this.currentIndex = index;

      this.updateTransform();
    }
  }

  private updateTransform(): void {
    // Calculate translation based on actual card dimensions and spacing
    let movePerCard: number;

    if (this.visibleCards === 1) {
      // Mobile: 100% width, no margin
      movePerCard = 100;
    } else {
      // Desktop/Tablet: 2 cards, need to account for gap and card width
      // Each card is calc(50% - 0.75rem) with 1.5rem gap between them
      // So we need to move by 50% + half the gap (0.75rem)
      movePerCard = 50;
    }

    this.currentTranslateX = -this.currentIndex * movePerCard;
  }

  // Initialize slider on component changes
  ngOnInit(): void {
    this.updateCardWidth();
    this.initializeImageStates();

    // Listen for window resize to update card width
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.updateCardWidth();
      });
    }
  }

  // Initialize image loading states for all services
  private initializeImageStates(): void {
    this.servicesToDisplay.forEach(service => {
      if (service.image) {
        this.imageLoading[service.id] = true;
        this.imageError[service.id] = false;
      }
    });
  }

  private updateCardWidth(): void {
    // Calculate visible cards and card width based on screen size
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        // Mobile: 1 card
        this.visibleCards = 1;
        this.cardWidth = 100;
        this.cardSpacing = 0; // No margin on mobile
      } else {
        // Desktop/Tablet: 2 cards
        this.visibleCards = 2;
        this.cardWidth = 50;
        this.cardSpacing = 1.5; // 1.5rem margin
      }

      // Update transform after changing card width
      this.updateTransform();
    }
  }

  // Image loading state methods
  onImageLoad(serviceId: string): void {
    this.imageLoading[serviceId] = false;
    this.imageError[serviceId] = false;
  }

  onImageError(serviceId: string): void {
    this.imageLoading[serviceId] = false;
    this.imageError[serviceId] = true;
  }

  // Touch event handlers for mobile swipe
  onTouchStart(event: TouchEvent): void {
    if (this.displayMode !== 'slider') return;
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    if (this.displayMode !== 'slider') return;
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd(): void {
    if (this.displayMode !== 'slider') return;
    
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > this.minSwipeDistance && this.touchEndX) {
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

  // Lifecycle method
  ngOnDestroy(): void {
    // Clean up any event listeners or subscriptions if needed
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateCardWidth);
    }
  }

  // Image method
  getServiceImagePath(imageName?: string): string {
    return this.imageLoaderService.getServiceImagePath(imageName);
  }

  // Dialog method
  openDetailsDialog(service: ServiceCard): void {
    const dialogRef = this.dialog.open(ServiceDetailDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: service,
      disableClose: false,
      autoFocus: true,
      restoreFocus: true,
      panelClass: 'service-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Dialog handles navigation internally, no action needed here
      if (result === 'contact') {
        // Contact navigation is handled in the dialog component
      }
    });
  }
}

