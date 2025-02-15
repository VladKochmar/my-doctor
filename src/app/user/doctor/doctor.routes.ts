import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'my-services',
    loadComponent: () =>
      import('./pages/doctors-services/doctors-services.page').then(
        (m) => m.DoctorsServicesPage
      ),
  },
  {
    path: 'service-editor/:id',
    loadComponent: () =>
      import('./pages/service-editor/service-editor.page').then(
        (m) => m.ServiceEditorPage
      ),
  },
  {
    path: 'service-editor',
    loadComponent: () =>
      import('./pages/service-editor/service-editor.page').then(
        (m) => m.ServiceEditorPage
      ),
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./pages/doctors-schedule/doctors-schedule.page').then(
        (m) => m.DoctorsSchedulePage
      ),
  },
];
