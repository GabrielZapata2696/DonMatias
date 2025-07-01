import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'nosostros',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'contratacion',
    loadChildren: () => import('./features/contratacion/contratacion.module').then(m => m.ContratacionModule)
  },
  { path: '**', redirectTo: '' }
];
