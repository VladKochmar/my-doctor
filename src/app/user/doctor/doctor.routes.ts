import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'my-services',
    loadComponent: () =>
      import('./pages/doctors-services/doctors-services.page').then(
        (m) => m.DoctorsServicesPage
      ),
  },
];
