import { CurrentUserInterface } from '../../shared/models/currentUser.interface';

export interface UserStateInterface {
  currentUser: CurrentUserInterface | null;
  isLoading: boolean;
  error: string | null;
}
