import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AutoScrollService } from './shared/services/auto-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'brochure';

  constructor(private autoScrollService: AutoScrollService) {}

  ngOnInit(): void {
    // Auto-scroll service is automatically initialized in constructor
  }
}
