import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authRedirectGuard } from './core/guards/authRedirect.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [authRedirectGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes').then((m) => m.userRoutes),
    canActivate: [authGuard],
  },
];
