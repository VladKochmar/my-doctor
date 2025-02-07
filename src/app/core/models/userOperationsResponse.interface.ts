import { CurrentUserInterface } from '../../shared/models/currentUser.interface';

export interface UserOperationsResponseInterface {
  message: string;
  user: CurrentUserInterface;
}
