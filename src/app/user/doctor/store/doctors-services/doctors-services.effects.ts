import { inject } from '@angular/core';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { doctorsServicesActions } from './doctors-services.actions';
import { DoctorsServicesService } from '../../services/doctors-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorsScheduleService } from '../../services/doctors-schedule.service';

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

export const loadTemplatesEffect = createEffect(
  (
    actions$ = inject(Actions),
    doctorsServicesService = inject(DoctorsServicesService)
  ) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.loadTemplates),
      switchMap(() =>
        doctorsServicesService.loadTemplates().pipe(
          map((templates) =>
            doctorsServicesActions.loadTemplatesSuccess({ templates })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              doctorsServicesActions.loadTemplatesFailure({
                error: errorResponse.error.error,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const editServiceEffect = createEffect(
  (
    actions$ = inject(Actions),
    doctorsServicesService = inject(DoctorsServicesService)
  ) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.editService),
      switchMap(({ serviceData, id }) => {
        return doctorsServicesService.editService(serviceData, id).pipe(
          mergeMap((message) => [
            doctorsServicesActions.editServiceSuccess({ message }),
            doctorsServicesActions.loadDoctorServices(),
          ]),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('errorResponse.error', errorResponse.error);

            return of(
              doctorsServicesActions.editSerivceFailure({
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

export const informAfterEditEffect = createEffect(
  (
    actions$ = inject(Actions),
    snackBar = inject(MatSnackBar),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.editServiceSuccess),
      tap(({ message }) => {
        snackBar.open(message, 'Close', { horizontalPosition: 'right' });
        router.navigateByUrl('/user/doctor/my-services');
      })
    );
  },
  { functional: true, dispatch: false }
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

export const loadDoctorsSchedulesEffect = createEffect(
  (
    actions$ = inject(Actions),
    doctorsScheduleService = inject(DoctorsScheduleService)
  ) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.loadSchedules),
      switchMap(() =>
        doctorsScheduleService.loadDoctorsSchedule().pipe(
          map((schedules) =>
            doctorsServicesActions.loadSchedulesSuccess({ schedules })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              doctorsServicesActions.loadSchedulesFailure({
                error: errorResponse.error.error,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const saveDoctorsScheduleEffect = createEffect(
  (
    actions$ = inject(Actions),
    doctorsScheduleService = inject(DoctorsScheduleService)
  ) => {
    return actions$.pipe(
      ofType(doctorsServicesActions.saveSchedules),
      switchMap(({ schedulesData }) =>
        doctorsScheduleService.saveDoctorsSchedule(schedulesData).pipe(
          mergeMap((message) => [
            doctorsServicesActions.saveSchedulesSuccess({ message }),
            doctorsServicesActions.loadSchedules(),
          ]),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              doctorsServicesActions.saveSchedulesFailure({
                error: errorResponse.error.error,
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
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
