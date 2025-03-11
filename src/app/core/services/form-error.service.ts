import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface';
import { FormErrorMessages } from '../utils/FormErrorMessages.util';

@Injectable({ providedIn: 'root' })
export class FormErrorService {
  getError(
    control: AbstractControl | null,
    controlName: string,
    backendErrors: BackendErrorsInterface | null
  ): string | null {
    if (!control) return null;

    const controlErrors = backendErrors ? backendErrors[controlName] : null;
    const controlError = controlErrors ? controlErrors[0] : null;

    return FormErrorMessages.getErrorMessage(control, controlError);
  }
}
