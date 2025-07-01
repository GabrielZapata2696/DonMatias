import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contratacion',
  templateUrl: './contratacion.component.html',
  styleUrls: ['./contratacion.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ContratacionComponent {
  contratos = [
    {
      title: 'Contrato Básico',
      description: 'Ideal para pequeñas empresas',
      features: [
        'Soporte 8x5',
        'Mantenimiento básico',
        'Actualizaciones mensuales'
      ],
      price: '$999/mes'
    },
    {
      title: 'Contrato Premium',
      description: 'Para empresas medianas',
      features: [
        'Soporte 24/7',
        'Mantenimiento completo',
        'Actualizaciones semanales',
        'Consultoría mensual'
      ],
      price: '$1,999/mes'
    },
    {
      title: 'Contrato Enterprise',
      description: 'Solución completa para grandes empresas',
      features: [
        'Soporte prioritario 24/7',
        'Mantenimiento preventivo y correctivo',
        'Actualizaciones personalizadas',
        'Consultoría semanal',
        'Equipo dedicado'
      ],
      price: '$4,999/mes'
    }
  ];
}
