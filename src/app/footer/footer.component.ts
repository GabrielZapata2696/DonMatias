import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressBarMode, MatProgressBarModule } from '@angular/material/progress-bar';
import { NavRoute } from '../interfaces/main.interfaces';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ RouterLink, MatProgressBarModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;

  nombreEmpresa = 'D O N M A T Í A S';
  nombreEmpresa2 = 'Empresa de Desarrollo Territorial'

  currentDate = new Date();


  routes: NavRoute[] = [
    { path: '', label: 'Inicio', exact: true },
    { path: 'servicios', label: 'Servicios' },
    { path: 'contratacion', label: 'Contratación' },
    { path: 'nosostros', label: 'Nosotros' },
    { path: 'contacto', label: 'Contáctenos' }

  ];


  onMouseOverFooter() {
    this.value = 100;
  }

  onMouseOutFooter() {
    this.value = 0;
  }

}
