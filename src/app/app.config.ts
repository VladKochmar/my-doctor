import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';

import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideState, provideStore } from '@ngrx/store';
import { authFeatureKey, authReducer } from './auth/store/auth.reducer';
import { userFeatureKey, userReducer } from './core/store/user/user.reducer';

import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/auth.effects';
import * as userEffects from './core/store/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(userFeatureKey, userReducer),
    provideEffects(authEffects, userEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
