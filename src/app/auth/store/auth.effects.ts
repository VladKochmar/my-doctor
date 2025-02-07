import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '../services/auth.service';
import { PersistanceService } from '../../shared/services/persistance.service';

import { authActions } from './auth.actions';
import { userActions } from '../../core/store/user/user.actions';

import { AuthResponseInterface } from '../models/authResponse.interface';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          tap((response: AuthResponseInterface) => {
            persistanceService.set('accessToken', response.tokenData.token);
          }),
          map((response: AuthResponseInterface) => {
            return authActions.registerSuccess({ currentUser: response.user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
                error: errorResponse.error.error,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logIn),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          tap((response) => {
            persistanceService.set('accessToken', response.tokenData.token);
          }),
          map((response) => {
            return authActions.logInSuccess({ currentUser: response.user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.logInFailure({
                errors: errorResponse.error.errors,
                error: errorResponse.error.error,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterOrLogInEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess, authActions.logInSuccess),
      tap(() => {
        router.navigateByUrl('/user/profile');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const authSuccessEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(authActions.logInSuccess, authActions.registerSuccess),
      map(({ currentUser }) => userActions.updateUser({ user: currentUser }))
    );
  },
  { functional: true }
);
