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
import { LogInRequestInterface } from '../../models/loginRequest.interface';
import { AuthFormStateInterface } from '../../models/authFormState.interface';
import { BackendErrorsInterface } from '../../../shared/models/backendErrors.interface';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'md-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInPage implements OnInit {
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

    const request: LogInRequestInterface = this.form.getRawValue();
    this.store.dispatch(authActions.logIn({ request }));
  }
}
