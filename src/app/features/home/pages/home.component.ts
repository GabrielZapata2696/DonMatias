import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardImageComponent } from "../../../shared/components/card-image/card-image.component";

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
    CardImageComponent
  ]
})
export class HomeComponent {
  textDescripcion: string = ` Somos el Fondo Mixto DONMATÍAS, y para nosotros es un privilegio
        acercarnos a tan respetada Entidad. Contamos con un equipo comprometido
        con la excelencia, la eficiencia y el profesionalismo en la ejecución de
        proyectos, procesos contractuales y gestión social, siempre con el
        objetivo de fortalecer el desarrollo de las regiones.`;

  textDescripcion2: string = ` Nuestra trayectoria respalda lo que hacemos: somos un Fondo con resultados medibles, visión transformadora y un claro enfoque territorial.
Estamos listos para ser su aliado estratégico y construir juntos soluciones reales que impacten positivamente a las comunidades.`;

  origen: string = `home`;
  imagen: string = `imagenes/alcantarillado-project.png`
}
