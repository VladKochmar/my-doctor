import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';
import { userActions } from './core/store/user/user.actions';

import { PersistanceService } from './shared/services/persistance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private persistanceService: PersistanceService
  ) {}

  ngOnInit(): void {
    const token = this.persistanceService.get('accessToken');
    if (token) this.store.dispatch(userActions.loadUser());
  }

  logOut(): void {
    this.store.dispatch(userActions.logOut());
  }
}
