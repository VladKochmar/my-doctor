import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../../shared/models/currentUser.interface';
import { BackendErrorsInterface } from '../../../shared/models/backendErrors.interface';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    'Load user': emptyProps(),
    'Load user success': props<{ user: CurrentUserInterface }>(),
    'Load user failure': props<{ error: string }>(),

    'Update user': props<{ user: CurrentUserInterface }>(),

    'Update user profile': props<{ request: FormData }>(),
    'Update user profile success': props<{
      user: CurrentUserInterface;
      message: string;
    }>(),
    'Update user profile failure': props<{
      errors: BackendErrorsInterface;
      error: string | null;
    }>(),

    'Delete user': emptyProps(),
    'Delete user success': props<{ message: string }>(),
    'Delete user failure': props<{ error: string }>(),

    'Log out': emptyProps(),
  },
});
