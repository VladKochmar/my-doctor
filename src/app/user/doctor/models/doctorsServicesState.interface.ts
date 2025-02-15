import { BackendErrorsInterface } from '../../../shared/models/backendErrors.interface';
import { DoctorServiceInterface } from '../../../shared/models/doctorService.interface';
import { ServiceTemplateInterface } from '../../../shared/models/serviceTemplate.interface';
import { DoctorsScheduleInterface } from './doctorsSchedule.interface';

export interface DoctorsServicesStateInterface {
  isLoading: boolean;
  services: DoctorServiceInterface[] | null;
  templates: ServiceTemplateInterface[] | null;
  schedules: DoctorsScheduleInterface[] | null;
  validationErrors: BackendErrorsInterface | null;
}
