import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface';
import { CurrentUserInterface } from '../../shared/models/currentUser.interface';

export interface UserStateInterface {
  currentUser: CurrentUserInterface | null;
  isLoading: boolean;
  error: string | null;
  errors: BackendErrorsInterface | null;
  message: string | null;
}
