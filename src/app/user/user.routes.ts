import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.UserProfilePage),
  },
];
