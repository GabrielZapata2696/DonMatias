import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Ana García',
      position: 'CEO & Fundadora',
      bio: 'Con más de 15 años de experiencia en la industria, Ana lidera nuestra empresa con visión y dedicación.',
      image: 'assets/team/ana-garcia.jpg'
    },
    {
      name: 'Carlos Rodríguez',
      position: 'Director de Tecnología',
      bio: 'Carlos aporta 12 años de experiencia técnica y liderazgo en innovación a nuestro equipo.',
      image: 'assets/team/carlos-rodriguez.jpg'
    },
    {
      name: 'Laura Martínez',
      position: 'Directora de Marketing',
      bio: 'Laura ha transformado nuestra estrategia de marketing con su enfoque creativo y profundo conocimiento del sector.',
      image: 'assets/team/laura-martinez.jpg'
    }
  ];

  companyValues = [
    {
      icon: 'lightbulb',
      title: 'Innovación',
      description: 'Constantemente buscamos nuevas formas de superar los límites y ofrecer soluciones innovadoras.'
    },
    {
      icon: 'handshake',
      title: 'Integridad',
      description: 'Mantenemos los más altos estándares de honestidad y transparencia en todo lo que hacemos.'
    },
    {
      icon: 'groups',
      title: 'Colaboración',
      description: 'Creemos en el poder del trabajo en equipo y el éxito compartido.'
    },
    {
      icon: 'star',
      title: 'Excelencia',
      description: 'Nos esforzamos por alcanzar la excelencia en cada aspecto de nuestro trabajo.'
    }
  ];
}
