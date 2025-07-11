import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavRoute } from '../interfaces/main.interfaces';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, CommonModule ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isMenuOpen = false;
  nombreEmpresa = 'D O N M A T Í A S';

  routes: NavRoute[] = [
    { path: '', label: 'Inicio', exact: true },
    { path: 'servicios', label: 'Servicios' },
    { path: 'contratacion', label: 'Contratación' },
    { path: 'nosostros', label: 'Nosotros' },
    { path: 'contacto', label: 'Contáctenos' }

  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
