import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, take } from 'rxjs';

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
import { selectSchedules } from '../../store/doctors-services/doctors-services.reducer';
import { ScheduleFormInterface } from '../../models/scheduleForm.interface';
import { FormValidation } from '../../../../core/utils/FormValidation.util';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsSchedulePage implements OnInit {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private store = inject(Store);

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
      .subscribe((schedules) => {
        this.populateSchedules(schedules);
        this.cdr.markForCheck();
      });
  }

  private populateSchedules(schedules: DoctorsScheduleInterface[]): void {
    const scheduleFormGroups = schedules.map((schedule) =>
      this.createScheduleFormGroup(schedule)
    );
    const formArray = this.fb.array(scheduleFormGroups);
    this.form.setControl('schedules', formArray);

    this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  private createScheduleFormGroup(
    scheduleGroup: ScheduleFormInterface | null = null
  ): FormGroup {
    return this.fb.nonNullable.group({
      day_of_week: [scheduleGroup?.day_of_week ?? null, [Validators.required]],
      start_time: [scheduleGroup?.start_time ?? null, [Validators.required]],
      end_time: [
        scheduleGroup?.end_time ?? null,
        [Validators.required, FormValidation.endTimeBeforeStartTime],
      ],
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
}
