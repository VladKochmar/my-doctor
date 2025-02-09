import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { doctorsServicesActions } from './doctors-services.actions';
import { DoctorsServicesService } from '../../services/doctors-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loadDoctorsServicesEffect = createEffect(
  (
    actions$ = inject(Actions),
    doctorsServicesService = inject(DoctorsServicesService)
  ) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.loadDoctorServices),
      switchMap(() => {
        return doctorsServicesService.loadDoctorsServices().pipe(
          map((services) =>
            doctorsServicesActions.loadDoctorServicesSuccess({ services })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              doctorsServicesActions.loadDoctorServicesFailure({
                error: errorResponse.error.error,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const deleteEffect = createEffect(
  (
    actions$ = inject(Actions),
    doctorsServicesService = inject(DoctorsServicesService)
  ) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.deleteDoctorService),
      switchMap(({ serviceId }) => {
        return doctorsServicesService.deleteDoctorsService(serviceId).pipe(
          map((message) =>
            doctorsServicesActions.deleteDoctorServiceSuccess({
              id: serviceId,
              message,
            })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              doctorsServicesActions.deleteDoctorServiceFailure({
                error: errorResponse.error.error,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const informAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.deleteDoctorServiceSuccess),
      tap(({ message }) =>
        snackBar.open(message, 'Close', { horizontalPosition: 'right' })
      )
    );
  },
  { functional: true, dispatch: false }
);

export const infromAfterFailureEffect = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(
        doctorsServicesActions.deleteDoctorServiceFailure,
        doctorsServicesActions.loadDoctorServicesFailure
      ),
      tap(({ error }) =>
        snackBar.open(error, 'Close', { horizontalPosition: 'right' })
      )
    );
  },
  { functional: true, dispatch: false }
);
