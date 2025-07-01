import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './pages/about.component';

@NgModule({
  imports: [
    AboutRoutingModule,
    AboutComponent
  ]
})
export class AboutModule { }
