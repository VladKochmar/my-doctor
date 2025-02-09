import { DoctorServiceInterface } from '../../../shared/models/doctorService.interface';

export interface DoctorsServicesStateInterface {
  isLoading: boolean;
  services: DoctorServiceInterface[] | null;
}
