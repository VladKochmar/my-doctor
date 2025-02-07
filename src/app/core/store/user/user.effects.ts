import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, of, switchMap, tap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user.actions';

import { UserService } from '../../services/user.service';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

export const loadUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.loadUser),
      switchMap(() => {
        return userService.loadUser().pipe(
          map((user) => userActions.loadUserSuccess({ user })),
          catchError((error) => of(userActions.loadUserFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const userUpdateProfileEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.updateUserProfile),
      switchMap(({ request }) => {
        return userService.updateUser(request).pipe(
          map((response) =>
            userActions.updateUserProfileSuccess({
              user: response.user,
              message: response.message,
            })
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              userActions.updateUserProfileFailure({
                error: errorResponse.error.error,
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const userDeleteEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.deleteUser),
      switchMap(() => {
        return userService.deleteUser().pipe(
          map((response) =>
            userActions.deleteUserSuccess({ message: response.message })
          ),
          catchError((error) => of(userActions.deleteUserFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const informAfterSuccess = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(
        userActions.updateUserProfileSuccess,
        userActions.deleteUserSuccess
      ),
      tap(({ message }) =>
        snackBar.open(message, 'Close', { horizontalPosition: 'right' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const logOutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(userActions.logOut, userActions.deleteUserSuccess),
      tap(() => {
        persistanceService.remove('accessToken');
        router.navigateByUrl('/auth/log-in');
      })
    );
  },
  { functional: true, dispatch: false }
);
