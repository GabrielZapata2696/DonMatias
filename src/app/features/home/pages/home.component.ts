import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardImageComponent } from "../../../shared/components/card-image/card-image.component";
import { AllySliderComponent } from "../../../shared/components/ally-slider/ally-slider.component";
import { ImageService } from '../../../shared/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CardImageComponent,
    AllySliderComponent
  ]
})
export class HomeComponent {
  textDescripcion = ` Somos el Fondo Mixto DONMATÍAS, y para nosotros es un privilegio
        acercarnos a tan respetada Entidad. Contamos con un equipo comprometido
        con la excelencia, la eficiencia y el profesionalismo en la ejecución de
        proyectos, procesos contractuales y gestión social, siempre con el
        objetivo de fortalecer el desarrollo de las regiones.`;

  textDescripcion2 = ` Nuestra trayectoria respalda lo que hacemos: somos un Fondo con resultados medibles, visión transformadora y un claro enfoque territorial.
Estamos listos para ser su aliado estratégico y construir juntos soluciones reales que impacten positivamente a las comunidades.`;

  origen = `home`;
  imagen = '';
  
  constructor(private imageService: ImageService) {
    // Initialize image URL using ImageService
    this.imagen = this.imageService.getImageUrl('alcantarillado-project.webp');
  }
}
