import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export interface Partner {
  title: string;
  subtitle: string;
  image: string;
  logo: string;
  logoAlt: string;
  mainText: string;
  secondaryText: string;
  alt: string;
  imageLoaded?: boolean;
  imageError?: boolean;
  logoLoaded?: boolean;
  logoError?: boolean;
}

@Component({
  selector: 'app-socios-constitucion',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './socios-constitucion.component.html',
  styleUrls: ['./socios-constitucion.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SociosConstitucionComponent {
  partners: Partner[] = [
    {
      title: 'FOVIS – Fondo de Vivienda de Interés Social y Reforma Urbana de Donmatías',
      subtitle: 'Desarrollo de Vivienda Social',
      image: 'donmatias-external-images/socios/fovis_1.jpg',
      logo: 'donmatias-external-images/socios/fovis_logo.jpg',
      logoAlt: 'Logo FOVIS',
      alt: 'Proyecto de vivienda FOVIS',
      mainText: 'Gestionamos y desarrollamos proyectos de construcción y/o mejoramiento de vivienda rural, urbana y de interés social.',
      secondaryText: 'En el año 1993 inicia nuestra actividad principal, es así como hemos contribuido con la transformación de municipios y ciudades, también hemos impactado en el área rural. Realmente es satisfactorio cómo la vivienda propia trae un impacto en las familias de nuestras sociedades.'
    },
    {
      title: 'SERVIDONMATÍAS',
      subtitle: 'Servicios de Agua y Saneamiento Básico',
      image: 'donmatias-external-images/socios/servidonmatias_1.jpg',
      logo: 'donmatias-external-images/socios/servidonmatias_logo.jpg',
      logoAlt: 'Logo SERVIDONMATÍAS',
      alt: 'Proyecto de agua y saneamiento SERVIDONMATÍAS',
      mainText: 'Desarrollamos proyectos de agua y saneamiento básico, promoviendo la efectiva prestación de servicios públicos y los recursos naturales, generando impacto en el desarrollo de los territorios.',
      secondaryText: 'Nuestra actividad inicia en el año 2015, como solución a la necesidad que requería la comunidad, tenemos capacidad, experiencia y profesionalismo para encargarnos de cualquier necesidad.'
    }
  ];

  constructor() { }

  trackByPartner(index: number, partner: Partner): string {
    return partner.title;
  }

  onImageLoad(partner: Partner): void {
    partner.imageLoaded = true;
    partner.imageError = false;
  }

  onImageError(event: any, partner: Partner): void {
    // Prevent multiple error attempts
    if (partner.imageError) {
      return;
    }
    
    console.error('Image failed to load:', event.target.src);
    partner.imageError = true;
    partner.imageLoaded = false;
    
    // Set a simple fallback or hide the image
    event.target.style.display = 'none';
    
    // Optionally, you can set a fallback image
    // event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNTAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSIyMDAiIHk9IjEyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
  }

  onLogoLoad(partner: Partner): void {
    partner.logoLoaded = true;
    partner.logoError = false;
  }

  onLogoError(event: any, partner: Partner): void {
    // Prevent multiple error attempts
    if (partner.logoError) {
      return;
    }
    
    console.error('Logo failed to load:', event.target.src);
    partner.logoError = true;
    partner.logoLoaded = false;
    
    // Hide the logo container if logo fails to load
    event.target.style.display = 'none';
  }
}
