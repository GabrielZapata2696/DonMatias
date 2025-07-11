import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoScrollService {
  private readonly NAVIGATION_HEIGHT = 70; // Height of the navigation bar (fixed on desktop)
  private readonly HEADER_SELECTOR = 'app-header'; // Header component selector
  private readonly SCROLL_DELAY = 100; // Delay to ensure DOM is ready

  constructor(private router: Router) {
    this.initializeScrollBehavior();
  }

  private initializeScrollBehavior(): void {
    // Listen for successful navigation events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Small delay to ensure the component is loaded
        setTimeout(() => {
          if (this.isHomePage()) {
            // For home page, scroll to the very top
            this.scrollToTop();
          } else {
            // For other pages, scroll to content start
            this.scrollToContentStart();
          }
        }, this.SCROLL_DELAY);
      });
  }

  private scrollToContentStart(): void {
    try {
      // Target the main content area
      const mainContentElement = document.getElementById('main-content');
      
      if (mainContentElement) {
        // Get the actual position of the main content
        const mainContentTop = mainContentElement.offsetTop;
        const navigationHeight = this.getNavigationHeight();
        
        // Scroll to main content with a small offset for better UX
        const scrollPosition = mainContentTop - navigationHeight - 10;
        
        window.scrollTo({
          top: Math.max(0, scrollPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
      } else {
        // Fallback: calculate based on header presence
        const headerElement = document.querySelector(this.HEADER_SELECTOR);
        let scrollPosition = this.NAVIGATION_HEIGHT;

        if (headerElement) {
          // If header component exists, scroll to just after it
          const headerHeight = headerElement.getBoundingClientRect().height;
          scrollPosition = this.NAVIGATION_HEIGHT + headerHeight;
        }

        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    } catch {
      // Fallback: scroll to just after navigation
      window.scrollTo({
        top: this.NAVIGATION_HEIGHT,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Manually trigger scroll to content start
   * Useful for programmatic navigation
   */
  public scrollToContent(): void {
    setTimeout(() => {
      if (this.isHomePage()) {
        // For home page, scroll to the very top
        this.scrollToTop();
      } else {
        // For other pages, scroll to content start
        this.scrollToContentStart();
      }
    }, this.SCROLL_DELAY);
  }

  /**
   * Scroll to a specific element with navigation offset
   * @param elementId - ID of the element to scroll to
   */
  public scrollToElement(elementId: string): void {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - this.NAVIGATION_HEIGHT - 20; // Extra 20px padding

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, this.SCROLL_DELAY);
  }

  /**
   * Scroll to the very top of the page
   * Used for home page navigation
   */
  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Check if the current route is the home page
   */
  private isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  /**
   * Get the current navigation height
   */
  public getNavigationHeight(): number {
    const navElement = document.querySelector('.navigation');
    if (navElement) {
      return navElement.getBoundingClientRect().height;
    }
    return this.NAVIGATION_HEIGHT;
  }
}
