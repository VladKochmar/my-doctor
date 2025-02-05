import { Routes } from '@angular/router';
import { RegisterPage } from './components/register/register.page';
import { LogInPage } from './components/login/login.page';

export const authRoutes: Routes = [
  { path: 'sign-up', component: RegisterPage },
  { path: 'log-in', component: LogInPage },
];
