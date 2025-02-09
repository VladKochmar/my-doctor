import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DoctorServiceInterface } from '../../../../shared/models/doctorService.interface';

export const doctorsServicesActions = createActionGroup({
  source: 'doctorsServices',
  events: {
    'Load doctor services': emptyProps(),
    'Load doctor services success': props<{
      services: DoctorServiceInterface[];
    }>(),
    'Load doctor services failure': props<{ error: string }>(),

    'Delete doctor service': props<{ serviceId: number }>(),
    'Delete doctor service success': props<{ id: number; message: string }>(),
    'Delete doctor service failure': props<{ error: string }>(),
  },
});
