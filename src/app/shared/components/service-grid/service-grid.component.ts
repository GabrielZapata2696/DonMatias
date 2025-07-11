import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Import from external files
import { ServiceCard, DisplayMode } from '../../interfaces';
import { getServicesData } from '../../data';

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
export class ServiceGridComponent implements OnInit {
  @Input() displayMode: DisplayMode = 'grid';
  @Input() services: ServiceCard[] = [];

  // Slider navigation properties
  currentIndex = 0;
  currentTranslateX = 0;
  cardWidth = 50; // Percentage width per card
  cardSpacing = 1.5; // rem units for margin + gap
  visibleCards = 2; // Default to 2 cards visible

  // Default services loaded from external data file
  private defaultServices: ServiceCard[] = getServicesData();

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

    // Listen for window resize to update card width
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.updateCardWidth();
      });
    }
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
}

