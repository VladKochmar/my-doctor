import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { ViewerRoleType } from '../../models/viewerRole.type';
import { DoctorServiceInterface } from '../../models/doctorService.interface';
import { MatButtonModule } from '@angular/material/button';
import { DoctorsServicesStateInterface } from '../../../user/doctor/models/doctorsServicesState.interface';
import { doctorsServicesActions } from '../../../user/doctor/store/doctors-services/doctors-services.actions';

@Component({
  selector: 'md-service-card',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
})
export class ServiceCard {
  @Input() role: ViewerRoleType = 'viewer';
  @Input({ required: true }) data!: DoctorServiceInterface;

  private store = inject(
    Store<{ doctorsServices: DoctorsServicesStateInterface }>
  );

  openDialog(): void {}

  onDelete(): void {
    this.store.dispatch(
      doctorsServicesActions.deleteDoctorService({ serviceId: this.data.id })
    );
  }
}
