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

  constructor(private imageService: ImageService) {}

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
}
