import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

import { Store } from '@ngrx/store';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidation } from '../../core/utils/FormValidation.util';
import { selectCurrentUser } from '../../core/store/user/user.reducer';
import { userActions } from '../../core/store/user/user.actions';
import { Subject, takeUntil } from 'rxjs';
import { CurrentUserInterface } from '../../shared/models/currentUser.interface';

import { FormErrorMessages } from '../../core/utils/FormErrorMessages.util';
import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface';
import { selectValidationErrors } from '../../auth/store/auth.reducer';
import { AvatarSelector } from './components/avatar-selector/avatar-selector.component';

@Component({
  selector: 'md-user-profile',
  standalone: true,
  imports: [
    AvatarComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AvatarSelector,
  ],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
})
export class UserProfilePage implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  selectedUser$ = this.store.select(selectCurrentUser);
  selectedBackEndErrors$ = this.store.select(selectValidationErrors);

  form!: FormGroup;
  user: CurrentUserInterface | null = null;
  backendErrors: BackendErrorsInterface | null = null;

  ngOnInit(): void {
    this.initForm();
    this.selectedBackEndErrors$
      .pipe(takeUntil(this.destroy$))
      .subscribe((errors) => {
        this.backendErrors = errors;
      });

    this.selectedUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userResponse) => {
        if (userResponse) {
          this.form.patchValue(userResponse);
          this.user = userResponse;
        }
      });
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
      phone_number: [''],
      bio: [''],
      avatar: [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    Object.keys(this.form.controls).forEach((key) => {
      let value = this.form.get(key)?.value;

      if (value || value === '') formData.append(key, value);
    });

    this.store.dispatch(userActions.updateUserProfile({ request: formData }));
  }

  getError(
    controlName: string,
    backendErrors: BackendErrorsInterface | null
  ): string | null {
    const control = this.form.get(controlName);
    return control
      ? FormErrorMessages.getErrorMessage(
          control,
          backendErrors?.[controlName] ?? null
        )
      : null;
  }

  onDelete(): void {
    this.store.dispatch(userActions.deleteUser());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
