import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PromotionalCardComponent } from '../../../shared/components/promotional-card/promotional-card.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PromotionalCardComponent
  ]
})
export class ServicesComponent {
  services = [
    {
      title: 'Consultoría de Negocios',
      icon: 'business',
      description: 'Servicios de planificación estratégica y optimización empresarial para ayudar a su empresa a crecer.',
      features: [
        'Análisis de Mercado',
        'Estrategia de Crecimiento',
        'Optimización de Procesos',
        'Métricas de Rendimiento'
      ]
    },
    {
      title: 'Transformación Digital',
      icon: 'computer',
      description: 'Soluciones digitales integrales para modernizar sus operaciones empresariales.',
      features: [
        'Evaluación Tecnológica',
        'Estrategia Digital',
        'Implementación',
        'Capacitación'
      ]
    },
    {
      title: 'Soluciones de Marketing',
      icon: 'trending_up',
      description: 'Estrategias de marketing innovadoras para impulsar su presencia en el mercado.',
      features: [
        'Desarrollo de Marca',
        'Marketing Digital',
        'Estrategia de Contenido',
        'Analítica'
      ]
    },
    {
      title: 'Soporte al Cliente',
      icon: 'support_agent',
      description: 'Soporte al cliente 24/7 para garantizar su éxito.',
      features: [
        'Soporte Técnico',
        'Atención al Cliente',
        'Resolución de Problemas',
        'Gestión de Comentarios'
      ]
    }
  ];
}
