import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { combineLatest, Observable } from 'rxjs';

import { FormValidation } from '../../../core/utils/FormValidation.util';

import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth.actions';
import {
  selectError,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth.reducer';

import { AuthStateInterface } from '../../models/authState.interface';
import { AuthFormStateInterface } from '../../models/authFormState.interface';
import { RegisterRequestInterface } from '../../models/registerRequest.interface';
import { BackendErrorsInterface } from '../../../shared/models/backendErrors.interface';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'md-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage implements OnInit {
  private fb = inject(FormBuilder);
  private formError = inject(FormErrorService);
  private store = inject<Store<{ auth: AuthStateInterface }>>(Store);

  form!: FormGroup;
  hide = signal(true);

  data$: Observable<AuthFormStateInterface> = combineLatest({
    error: this.store.select(selectError),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  ngOnInit(): void {
    this.store.dispatch(authActions.clearErrors());
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.nonNullable.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          FormValidation.lettersOnly,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          FormValidation.containsLetter,
          FormValidation.containsNumber,
        ],
      ],
      role_id: [2, Validators.required],
    });
  }

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  getError(
    controlName: string,
    backendErrors: BackendErrorsInterface | null
  ): string | null {
    const control = this.form.get(controlName);
    return this.formError.getError(control, controlName, backendErrors);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: RegisterRequestInterface = this.form.getRawValue();
    this.store.dispatch(authActions.register({ request }));
  }
}
