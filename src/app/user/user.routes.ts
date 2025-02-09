import { Routes } from '@angular/router';
import { roleGuard } from '../core/guards/role.guard';

export const userRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.UserProfilePage),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.routes').then((m) => m.userRoutes),
    canActivate: [roleGuard],
  },
];
