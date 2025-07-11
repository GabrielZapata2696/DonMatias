import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-ally-slider',
  templateUrl: './ally-slider.component.html',
  styleUrls: [ './ally-slider.component.css' ],
  standalone: true,
  imports: [ CommonModule ]
})
export class AllySliderComponent implements OnInit {

  allies: string[] = [];
  
  constructor(private imageService: ImageService) {}

  // Duplicate the array to create seamless loop
  get duplicatedAllies(): string[] {
    return [ ...this.allies, ...this.allies ];
  }

  ngOnInit() {
    // Initialize allies array with ImageService URLs
    this.allies = [
      this.imageService.getAllyImage('Escudo_Donmatias.jpg'),
      this.imageService.getAllyImage('Escudo_Ebejico.jpg'),
      this.imageService.getAllyImage('Escudo_Entrerrios.jpg'),
      this.imageService.getAllyImage('Escudo_Guadalupe.jpg'),
      this.imageService.getAllyImage('Escudo_Jardin.jpg'),
      this.imageService.getAllyImage('Escudo_Remedios.jpg'),
      this.imageService.getAllyImage('Escudo_San_Pedro.jpg'),
      this.imageService.getAllyImage('Escudo_Santa_Barbara.jpg'),
      this.imageService.getAllyImage('Logo_Bioexplora_sas.jpg'),
      this.imageService.getAllyImage('Logo_Fovis.jpg'),
      this.imageService.getAllyImage('Logo_Gobernacion_Antioquia.jpg'),
      this.imageService.getAllyImage('acuatubos_s_a_s_logo.jpg'),
      this.imageService.getAllyImage('escudo-Fredonia.jpg'),
      this.imageService.getAllyImage('escudo_Anza.jpg'),
      this.imageService.getAllyImage('escudo_Barbosa.jpg'),
      this.imageService.getAllyImage('escudo_Gomez_Plata.jpg')
    ];
  }


  getAllyName(imagePath: string): string {
    const fileName = imagePath.split('/').pop() || '';
    return fileName.split('.')[ 0 ].replace(/_/g, ' ');
  }
}
