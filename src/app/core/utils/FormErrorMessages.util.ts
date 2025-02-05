import { AbstractControl } from '@angular/forms';

export class FormErrorMessages {
  private static errorMessages: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Please enter a valid email',
    minlength: 'Minimum length is not met',
    maxlength: 'Maximum length is not met',
    letterRequired: 'Must contain at least one letter',
    numberRequired: 'Must contain at least one number',
    lettersOnly: 'Must contain only letters',
  };

  static getClientErrorMessage(control: AbstractControl): string | null {
    if (!control.errors) return null;

    for (const errorKey in control.errors) {
      if (this.errorMessages[errorKey]) {
        if (errorKey === 'minlength') {
          return `Minimum length is ${
            control.getError('minlength')?.requiredLength
          }`;
        }

        if (errorKey === 'maxlength') {
          return `Maximum length is ${
            control.getError('maxlength')?.requiredLength
          }`;
        }

        return this.errorMessages[errorKey];
      }
    }

    return 'Invalid input';
  }

  static getErrorMessage(
    control: AbstractControl,
    backendErrors: string[] | null
  ): string | null {
    return backendErrors && backendErrors.length > 0
      ? backendErrors[0]
      : this.getClientErrorMessage(control);
  }
}
