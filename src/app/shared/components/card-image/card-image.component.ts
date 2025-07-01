import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'card-image',
  imports: [
    MatCardModule,
    MatIconModule ],
  templateUrl: './card-image.component.html',
  styleUrl: './card-image.component.css'
})
export class CardImageComponent {

  @Input() origen: string = '';
  @Input() imagen: string = '';
  @Input() titulo: string = '';



}
