import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../models/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/models/currentUser.interface';
import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface';
import { LogInRequestInterface } from '../models/loginRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{
      errors: BackendErrorsInterface;
      error: string | null;
    }>(),

    LogIn: props<{ request: LogInRequestInterface }>(),
    'LogIn success': props<{ currentUser: CurrentUserInterface }>(),
    'LogIn failure': props<{
      errors: BackendErrorsInterface;
      error: string | null;
    }>(),

    'Clear Errors': emptyProps(),
  },
});
