import { CurrentUserInterface } from '../../shared/models/currentUser.interface';

export interface AuthResponseInterface {
  result: string;
  user: CurrentUserInterface;
  tokenData: {
    token: string;
    expiresInMs: number;
  };
}
