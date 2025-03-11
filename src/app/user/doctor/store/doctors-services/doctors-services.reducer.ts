import { createFeature, createReducer, on } from '@ngrx/store';
import { DoctorsServicesStateInterface } from '../../models/doctorsServicesState.interface';
import { doctorsServicesActions } from './doctors-services.actions';

const initialState: DoctorsServicesStateInterface = {
  isLoading: false,
  services: null,
  templates: null,
  schedules: null,
  validationErrors: null,
};

const doctorsServicesFeature = createFeature({
  name: 'doctorsServices',
  reducer: createReducer(
    initialState,

    // Doctors Services
    on(doctorsServicesActions.loadDoctorServices, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(doctorsServicesActions.loadDoctorServicesSuccess, (state, aciton) => ({
      ...state,
      services: aciton.services,
      isLoading: false,
    })),
    on(doctorsServicesActions.loadDoctorServicesFailure, (state) => ({
      ...state,
      isLoading: false,
      services: null,
    })),

    // Templates
    on(doctorsServicesActions.loadTemplates, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(doctorsServicesActions.loadTemplatesSuccess, (state, action) => ({
      ...state,
      templates: action.templates,
      isLoading: false,
    })),
    on(doctorsServicesActions.loadTemplatesFailure, (state) => ({
      ...state,
      templates: null,
      isLoading: false,
    })),

    // Edit
    on(doctorsServicesActions.editService, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(doctorsServicesActions.editServiceSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(doctorsServicesActions.editSerivceFailure, (state, action) => {
      console.log('action.errors', action.errors);

      return {
        ...state,
        isLoading: false,
        validationErrors: action.errors,
      };
    }),

    // Delete
    on(doctorsServicesActions.deleteDoctorService, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(doctorsServicesActions.deleteDoctorServiceSuccess, (state, action) => ({
      ...state,
      services: state.services
        ? state.services.filter((service) => service.id !== action.id)
        : null,
      isLoading: false,
    })),
    on(doctorsServicesActions.deleteDoctorServiceFailure, (state) => ({
      ...state,
      isLoading: false,
      services: null,
    })),

    // Schedules
    on(doctorsServicesActions.loadSchedules, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(doctorsServicesActions.loadSchedulesSuccess, (state, action) => ({
      ...state,
      schedules: action.schedules,
      isLoading: false,
    })),
    on(doctorsServicesActions.loadSchedulesFailure, (state) => ({
      ...state,
      isLoading: false,
      schedules: null,
    })),

    on(doctorsServicesActions.saveSchedules, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(doctorsServicesActions.saveSchedulesSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(doctorsServicesActions.saveSchedulesFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    }))
  ),
});

export const {
  name: doctorsServicesFeatureKey,
  reducer: doctorsServicesReducer,
  selectServices,
  selectTemplates,
  selectSchedules,
  selectValidationErrors,
} = doctorsServicesFeature;
