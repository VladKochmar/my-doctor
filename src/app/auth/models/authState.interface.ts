import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface';

export interface AuthStateInterface {
  error: string | null;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
