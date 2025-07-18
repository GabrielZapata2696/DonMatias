import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AllySliderComponent } from '../../../shared/components/ally-slider/ally-slider.component';
import { ImageService } from '../../../shared/services/image.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    AllySliderComponent
  ]
})
export class AboutComponent {
  textDescripcion2 = ` Nuestra trayectoria respalda lo que hacemos: somos un Fondo con resultados medibles, visión transformadora y un claro enfoque territorial.
Estamos listos para ser su aliado estratégico y construir juntos soluciones reales que impacten positivamente a las comunidades.`;

  constructor(public imageService: ImageService) {}

  teamMembers = [
    {
      name: 'FOVIS',
      position: 'Fondo de Vivienda de Donmatías',
      bio: 'Especialistas en desarrollo de proyectos de vivienda de interés social y reforma urbana, con más de 30 años de experiencia transformando comunidades y mejorando la calidad de vida urbana.',
      image: 'assets/team/fovis.jpg'
    },
    {
      name: 'SERVIDONMATÍAS',
      position: 'Empresa de Servicios Públicos',
      bio: 'Expertos en agua potable y saneamiento básico, promoviendo la efectiva prestación de servicios públicos esenciales y el cuidado responsable de los recursos naturales.',
      image: 'assets/team/servidonmatias.jpg'
    },
    {
      name: 'Equipo Técnico',
      position: 'Profesionales Especializados',
      bio: 'Equipo multidisciplinario con alta capacidad técnica, experiencia comprobada y profesionalismo excepcional para ejecutar proyectos complejos de desarrollo territorial.',
      image: 'assets/team/equipo-tecnico.jpg'
    }
  ];

  companyValues = [
    {
      icon: 'verified',
      title: 'Transparencia',
      description: 'Rendimos cuentas, generamos confianza.'
    },
    {
      icon: 'speed',
      title: 'Eficiencia',
      description: 'Hacemos que cada recurso cuente.'
    },
    {
      icon: 'schedule',
      title: 'Celeridad',
      description: 'Damos respuestas oportunas con alto nivel técnico.'
    },
    {
      icon: 'assignment_turned_in',
      title: 'Responsabilidad',
      description: 'Cumplimos con excelencia y compromiso.'
    },
    {
      icon: 'settings',
      title: 'Gestión',
      description: 'Movilizamos capacidades, recursos y resultados.'
    },
    {
      icon: 'favorite',
      title: 'Respeto',
      description: 'Trabajamos por y para las comunidades.'
    }
  ];

  benefits = [
    {
      number: '1.',
      title: 'La mejor calificación',
      description: 'Contamos con una calificación institucional destacada, que respalda nuestra solidez operativa, legal y financiera. Somos garantía de confianza y respaldo.',
      image: 'nosotros/1-mejor-calificacion.jpg'
    },
    {
      number: '2.',
      title: 'Supervisión y control de calidad',
      description: 'Cada proyecto es supervisado con rigurosidad técnica. Nos aseguramos de cumplir con los más altos estándares en cada fase, desde el diseño hasta la entrega final.',
      image: 'nosotros/2-control-calidad.jpg'
    },
    {
      number: '3.',
      title: 'Transparencia en cada proceso',
      description: 'Actuamos con total transparencia administrativa, jurídica y financiera. Nuestras operaciones son abiertas, auditables y siempre alineadas con la normatividad vigente.',
      image: 'nosotros/3-transparencia.png'
    },
    {
      number: '4.',
      title: 'Administración oportuna de recursos públicos',
      description: 'Manejamos los recursos públicos con responsabilidad y cumplimiento estricto de los tiempos establecidos. Nos caracterizamos por la eficiencia y el respeto al presupuesto.',
      image: 'nosotros/4-admin-recursos.png'
    },
    {
      number: '5.',
      title: 'Calidad en la gestión de los proyectos',
      description: 'No solo ejecutamos, sino que garantizamos resultados. Nuestra gestión combina planificación estratégica, enfoque territorial y visión transformadora.',
      image: 'nosotros/5-calidad-gestion.png'
    },
    {
      number: '6.',
      title: 'Asesoría personalizada en cada proceso',
      description: 'Acompañamos a nuestros aliados con asesoría técnica y jurídica en cada etapa, asegurando soluciones a la medida de cada necesidad.',
      image: 'nosotros/6-asesoria-personal.jpg'
    }
  ];

  // Helper method to get image URL
  getImageUrl(imagePath: string): string {
    return this.imageService.getImageUrl(imagePath);
  }

  // Helper method to check if benefit is even (for alternating layout)
  isEven(index: number): boolean {
    return index % 2 === 0;
  }

  // Helper method to handle image loading errors
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.imageService.getFallbackImageUrl();
  }
}
