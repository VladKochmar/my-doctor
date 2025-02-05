import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, of, switchMap, tap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user.actions';

import { UserService } from '../../services/user.service';
import { PersistanceService } from '../../../shared/services/persistance.service';

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

export const logOutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(userActions.logOut),
      tap(() => {
        persistanceService.remove('accessToken');
        router.navigateByUrl('/auth/log-in');
      })
    );
  },
  { functional: true, dispatch: false }
);
