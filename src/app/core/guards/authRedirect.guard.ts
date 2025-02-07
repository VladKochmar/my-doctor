import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/user/user.reducer';

export const authRedirectGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectCurrentUser).pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl('/user/profile');
        return false;
      }
      return true;
    })
  );
};
