import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import {
  selectServices,
  selectTemplates,
  selectValidationErrors,
} from '../../store/doctors-services/doctors-services.reducer';
import { doctorsServicesActions } from '../../store/doctors-services/doctors-services.actions';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { ServiceTemplateInterface } from '../../../../shared/models/serviceTemplate.interface';
import { DoctorsServiceRequestInterface } from '../../models/doctorsServiceRequest.interface';
import { BackendErrorsInterface } from '../../../../shared/models/backendErrors.interface';
import { FormErrorService } from '../../../../core/services/form-error.service';
import { FormValidation } from '../../../../core/utils/FormValidation.util';

@Component({
  selector: 'md-service-editor',
  standalone: true,
  imports: [
    AsyncPipe,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './service-editor.page.html',
  styleUrl: './service-editor.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceEditorPage implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private formError = inject(FormErrorService);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  serviceId: number | null = null;
  isEditMode: boolean = false;
  validationErros: BackendErrorsInterface | null = null;

  form: FormGroup = this.fb.nonNullable.group({
    service_id: this.fb.control<null | number>(null, [Validators.required]),
    custom_price: this.fb.control<null | number>(null, [
      Validators.required,
      Validators.min(0),
      FormValidation.numbersOnly,
    ]),
    custom_duration: this.fb.control<null | number>(null, [
      Validators.required,
      Validators.min(1),
      FormValidation.numbersOnly,
    ]),
    custom_description: this.fb.control<string>('', [Validators.required]),
  });

  templates$: Observable<ServiceTemplateInterface[] | null> =
    this.store.select(selectTemplates);
  selectedTemplate$: Observable<ServiceTemplateInterface | null> = this.form
    .get('service_id')!
    .valueChanges.pipe(
      filter((id) => !!id),
      switchMap((id) =>
        this.templates$.pipe(
          map(
            (templates) =>
              templates?.find((template) => template.template_id === id) || null
          )
        )
      ),
      tap((template) => {
        if (template && !this.isEditMode) {
          this.form.patchValue({
            custom_price: template.default_price,
            custom_duration: template.default_duration,
            custom_description: template.default_description,
          });
        }
      })
    );
  selectedValidationErrors$ = this.store.select(selectValidationErrors);

  ngOnInit(): void {
    this.store.dispatch(doctorsServicesActions.loadTemplates());
    this.store.dispatch(doctorsServicesActions.loadDoctorServices());

    this.selectedTemplate$.pipe(takeUntil(this.destroy$)).subscribe();

    this.selectedValidationErrors$
      .pipe(takeUntil(this.destroy$))
      .subscribe((errors) => {
        this.validationErros = { ...errors };
        this.cdr.markForCheck();
      });

    combineLatest([
      this.route.params.pipe(
        map((params) => (params['id'] ? parseInt(params['id']) : null))
      ),
      this.store.select(selectServices),
    ])
      .pipe(
        tap(([id, services]) => {
          this.serviceId = id;
          this.isEditMode = !!this.serviceId;

          if (this.isEditMode) {
            const service = services?.find((s) => s.id === this.serviceId);

            if (service) {
              this.form.patchValue({
                service_id: service.service_id,
                custom_price: service.price,
                custom_duration: service.duration,
                custom_description: service.description,
              });
            }
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getError(controlName: string): string | null {
    const control = this.form.get(controlName);
    return this.formError.getError(control, controlName, this.validationErros);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const serviceData: DoctorsServiceRequestInterface = { ...this.form.value };
    this.store.dispatch(
      doctorsServicesActions.editService({ serviceData, id: this.serviceId })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
