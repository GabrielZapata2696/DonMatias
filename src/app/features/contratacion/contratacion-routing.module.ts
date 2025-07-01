import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratacionComponent } from './pages/contratacion.component';

const routes: Routes = [
  { path: '', component: ContratacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratacionRoutingModule { }
