import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';
import { selectServices } from '../../store/doctors-services/doctors-services.reducer';

import { MatButtonModule } from '@angular/material/button';

import { ServiceCard } from '../../../../shared/components/service-card/service-card.component';
import { DoctorsServicesStateInterface } from '../../models/doctorsServicesState.interface';
import { doctorsServicesActions } from '../../store/doctors-services/doctors-services.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'md-doctors-services',
  standalone: true,
  imports: [RouterLink, ServiceCard, MatButtonModule, AsyncPipe],
  templateUrl: './doctors-serivces.page.html',
  styleUrl: './doctors-services.page.scss',
})
export class DoctorsServicesPage implements OnInit {
  private store = inject(
    Store<{ doctorsServices: DoctorsServicesStateInterface }>
  );
  services$ = this.store.select(selectServices);

  ngOnInit(): void {
    this.store.dispatch(doctorsServicesActions.loadDoctorServices());
  }
}
