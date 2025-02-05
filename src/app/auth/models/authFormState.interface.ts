import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface';

export interface AuthFormStateInterface {
  error: string | null;
  isSubmitting: boolean;
  backendErrors: BackendErrorsInterface | null;
}
