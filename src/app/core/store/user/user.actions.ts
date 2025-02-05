import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../../shared/models/currentUser.interface';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    'Load user': emptyProps(),
    'Load user success': props<{ user: CurrentUserInterface }>(),
    'Load user failure': props<{ error: string }>(),
    'Update user': props<{ user: CurrentUserInterface }>(),
    'Log out': emptyProps(),
  },
});
