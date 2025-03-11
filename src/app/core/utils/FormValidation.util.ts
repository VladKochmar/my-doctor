import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidation {
  static containsLetter(control: AbstractControl): ValidationErrors | null {
    const hasLetter = /[a-zA-Z]/.test(control.value || '');
    return hasLetter ? null : { letterRequired: true };
  }

  static containsNumber(control: AbstractControl): ValidationErrors | null {
    const hasNumber = /\d/.test(control.value || '');
    return hasNumber ? null : { numberRequired: true };
  }

  static lettersOnly(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^[a-zA-Z\s]+$/;

    if (value && !regex.test(value)) return { lettersOnly: true };

    return null;
  }

  static numbersOnly(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^\d+(\.\d{1,2})?$/;

    if (value && !regex.test(value)) {
      return { numbersOnly: true };
    }

    return null;
  }

  static endTimeBeforeStartTime(
    control: AbstractControl
  ): ValidationErrors | null {
    const scheduleGroup = control.parent as FormGroup;
    if (!scheduleGroup) return null;

    const startTime = scheduleGroup.get('start_time')?.value;
    console.log('startTime', startTime);

    const endTime = control.value;

    if (!startTime || !endTime) {
      return null;
    }

    const parseTime = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    if (parseTime(endTime) <= parseTime(startTime)) {
      return { endTimeBeforeStartTime: true };
    }

    return null;
  }
}
