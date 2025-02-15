import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'md-time-picker-dialog',
  standalone: true,
  imports: [MatDialogModule, MatSelectModule, MatButtonModule],
  templateUrl: './time-picker-dialog.component.html',
  styleUrl: './time-picker-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDialogComponent {
  private dialogRef: MatDialogRef<TimePickerDialogComponent> =
    inject(MatDialogRef);

  hours: string = '12';
  minutes: string = '00';
  hoursList: string[] = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  minutesList: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  close(): void {
    this.dialogRef.close(`${this.hours}:${this.minutes}`);
  }
}
