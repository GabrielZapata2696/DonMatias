import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ally-slider',
  templateUrl: './ally-slider.component.html',
  styleUrls: ['./ally-slider.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AllySliderComponent implements OnInit, OnDestroy {
  
  allies: string[] = [
    'imagenes/empresas_aliadas/Escudo_Donmatias.jpg',
    'imagenes/empresas_aliadas/Escudo_Ebejico.png',
    'imagenes/empresas_aliadas/Escudo_Entrerrios.png',
    'imagenes/empresas_aliadas/Escudo_Guadalupe.png',
    'imagenes/empresas_aliadas/Escudo_Jardin.jpg',
    'imagenes/empresas_aliadas/Escudo_Remedios.jpg',
    'imagenes/empresas_aliadas/Escudo_San_Pedro.jpg',
    'imagenes/empresas_aliadas/Escudo_Santa_Barbara.png',
    'imagenes/empresas_aliadas/Logo_Bioexplora_sas.png',
    'imagenes/empresas_aliadas/Logo_Fovis.jpg',
    'imagenes/empresas_aliadas/Logo_Gobernacion_Antioquia.jpg',
    'imagenes/empresas_aliadas/acuatubos_s_a_s_logo.jpg',
    'imagenes/empresas_aliadas/escudo-Fredonia.png',
    'imagenes/empresas_aliadas/escudo_Anza.png',
    'imagenes/empresas_aliadas/escudo_Barbosa.png',
    'imagenes/empresas_aliadas/escudo_Gomez_Plata.png'
  ];

  // Duplicate the array to create seamless loop
  get duplicatedAllies(): string[] {
    return [...this.allies, ...this.allies];
  }

  ngOnInit() {
    // No need for interval, CSS animation handles the sliding
  }

  ngOnDestroy() {
    // No cleanup needed since we're using CSS animation
  }

  getAllyName(imagePath: string): string {
    const fileName = imagePath.split('/').pop() || '';
    return fileName.split('.')[0].replace(/_/g, ' ');
  }
}
