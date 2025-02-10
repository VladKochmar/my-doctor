import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DoctorServiceInterface } from '../../../../shared/models/doctorService.interface';
import { ServiceTemplateInterface } from '../../../../shared/models/serviceTemplate.interface';
import { DoctorsServiceRequestInterface } from '../../models/doctorsServiceRequest.interface';

export const doctorsServicesActions = createActionGroup({
  source: 'doctorsServices',
  events: {
    'Load doctor services': emptyProps(),
    'Load doctor services success': props<{
      services: DoctorServiceInterface[];
    }>(),
    'Load doctor services failure': props<{ error: string }>(),

    'Load templates': emptyProps(),
    'Load templates success': props<{
      templates: ServiceTemplateInterface[];
    }>(),
    'Load templates failure': props<{ error: string }>(),

    'Edit service': props<{
      serviceData: DoctorsServiceRequestInterface;
      id: number | null;
    }>(),
    'Edit service success': props<{ message: string }>(),
    'Edit serivce failure': props<{
      error: string;
    }>(),

    'Delete doctor service': props<{ serviceId: number }>(),
    'Delete doctor service success': props<{ id: number; message: string }>(),
    'Delete doctor service failure': props<{ error: string }>(),
  },
});
