import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, Subject, take, takeUntil } from 'rxjs';

import { Store } from '@ngrx/store';

import { DayType } from '../../models/day.type';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TimePickerDialogComponent } from '../../../../shared/components/time-picker-dialog/time-picker-dialog.component';
import { doctorsServicesActions } from '../../store/doctors-services/doctors-services.actions';
import { DoctorsScheduleInterface } from '../../models/doctorsSchedule.interface';
import {
  selectSchedules,
  selectValidationErrors,
} from '../../store/doctors-services/doctors-services.reducer';
import { ScheduleFormInterface } from '../../models/scheduleForm.interface';
import { BackendErrorsInterface } from '../../../../shared/models/backendErrors.interface';
import { FormErrorMessages } from '../../../../core/utils/FormErrorMessages.util';

@Component({
  selector: 'md-doctors-schedule',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './doctors-schedule.page.html',
  styleUrl: './doctors-schedule.page.scss',
})
export class DoctorsSchedulePage implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private store = inject(Store);

  private destroy$ = new Subject<void>();

  days: DayType[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  form: FormGroup = this.fb.group({
    schedules: this.fb.array([]),
  });

  get schedules(): FormArray {
    return this.form.get('schedules') as FormArray;
  }

  ngOnInit(): void {
    this.store.dispatch(doctorsServicesActions.loadSchedules());

    this.store
      .select(selectSchedules)
      .pipe(
        filter((schedules) => !!schedules),
        take(1)
      )
      .subscribe((schedules) => this.populateSchedules(schedules));
  }

  private populateSchedules(schedules: DoctorsScheduleInterface[]): void {
    const scheduleFormGroups = schedules.map((schedule) =>
      this.createScheduleFormGroup(schedule)
    );
    const formArray = this.fb.array(scheduleFormGroups);
    this.form.setControl('schedules', formArray);
  }

  private createScheduleFormGroup(
    scheduleGroup: ScheduleFormInterface | null = null
  ): FormGroup {
    return this.fb.nonNullable.group({
      day_of_week: [scheduleGroup?.day_of_week ?? '', [Validators.required]],
      start_time: [scheduleGroup?.start_time ?? '', [Validators.required]],
      end_time: [scheduleGroup?.end_time ?? '', [Validators.required]],
    });
  }

  addSchedule(): void {
    this.schedules.push(this.createScheduleFormGroup());
  }

  removeSchedule(index: number): void {
    this.schedules.removeAt(index);
  }

  openTimePicker(control: FormControl): void {
    const dialogRef = this.dialog.open(TimePickerDialogComponent, {
      width: '250px',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          control.setValue(result);
        }
      });
  }

  getFormControl(control: AbstractControl, controlName: string): FormControl {
    return control.get(controlName) as FormControl;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const schedulesData: DoctorsScheduleInterface[] = this.schedules.value;
    this.store.dispatch(
      doctorsServicesActions.saveSchedules({ schedulesData })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
