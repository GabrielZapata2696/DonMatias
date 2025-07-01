import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-content-sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-sections.component.html',
  styleUrl: './content-sections.component.css'
})
export class ContentSectionsComponent implements OnInit {
  currentRoute: string = '';
  
  services: Service[] = [
    {
      title: 'Strategic Planning',
      icon: 'fas fa-chess',
      description: 'Develop comprehensive plans to help your business achieve its long-term goals and objectives.'
    },
    {
      title: 'Digital Marketing',
      icon: 'fas fa-bullhorn',
      description: 'Increase your online presence and reach more potential customers through effective digital marketing strategies.'
    },
    {
      title: 'Web Development',
      icon: 'fas fa-code',
      description: 'Create modern, responsive websites and web applications tailored to your specific business needs.'
    },
    {
      title: 'Brand Identity',
      icon: 'fas fa-palette',
      description: 'Establish a strong, recognizable brand that resonates with your target audience and sets you apart from competitors.'
    },
    {
      title: 'Analytics & Reporting',
      icon: 'fas fa-chart-bar',
      description: 'Gain valuable insights into your business performance with detailed analytics and custom reports.'
    },
    {
      title: 'Customer Support',
      icon: 'fas fa-headset',
      description: 'Provide exceptional customer service and support to ensure client satisfaction and loyalty.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url.split('/')[1];
  }

  isServicesPage(): boolean {
    return this.currentRoute === 'services';
  }

  isAboutPage(): boolean {
    return this.currentRoute === 'about';
  }

  isContactPage(): boolean {
    return this.currentRoute === 'contact';
  }

  getPageTitle(): string {
    switch(this.currentRoute) {
      case 'services':
        return 'Our Services';
      case 'about':
        return 'About Us';
      case 'contact':
        return 'Contact Us';
      default:
        return 'Content';
    }
  }

  getPageDescription(): string {
    switch(this.currentRoute) {
      case 'services':
        return 'Explore our comprehensive range of services designed to help your business thrive in today\'s competitive market.';
      case 'about':
        return 'Learn more about our company, our mission, and the dedicated team behind our success.';
      case 'contact':
        return 'Get in touch with our team for inquiries, support, or to discuss how we can help your business grow.';
      default:
        return '';
    }
  }
}
