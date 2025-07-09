import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AutoScrollService } from '../../services/auto-scroll.service';

@Component({
  selector: 'app-promotional-card',
  templateUrl: './promotional-card.component.html',
  styleUrls: ['./promotional-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  animations: [
    trigger('slideInFade', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class PromotionalCardComponent implements OnInit {
  
  constructor(
    private router: Router,
    private autoScrollService: AutoScrollService
  ) {}
  
  services = [
    {
      icon: 'account_balance',
      title: 'Contratación Estatal',
      description: 'Asesoría especializada en procesos de contratación pública'
    },
    {
      icon: 'build',
      title: 'Estructuración de Proyectos',
      description: 'Apoyo integral en la planificación y desarrollo de proyectos'
    },
    {
      icon: 'gavel',
      title: 'Consultoría Legal',
      description: 'Servicios jurídicos especializados en contratación'
    }
  ];

  animationState = 'in';

  ngOnInit(): void {
    // Animation trigger on component initialization
  }

  navigateToContact(): void {
    this.router.navigate(['/contacto']).then(() => {
      // Auto-scroll service will handle the scrolling automatically
      // but we can also manually trigger it if needed
      this.autoScrollService.scrollToContent();
    });
  }

  openEmail(): void {
    const email = 'info@empresa.com'; // Replace with actual email
    const subject = encodeURIComponent('Consulta sobre servicios de contratación');
    const body = encodeURIComponent('Estimados, me interesa obtener más información sobre sus servicios de contratación estatal y privada.');
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_self');
  }

  trackByService(index: number, service: any): string {
    return service.title;
  }
}
