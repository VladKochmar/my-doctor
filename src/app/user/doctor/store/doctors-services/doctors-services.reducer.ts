import { createFeature, createReducer, on } from '@ngrx/store';
import { DoctorsServicesStateInterface } from '../../models/doctorsServicesState.interface';
import { doctorsServicesActions } from './doctors-services.actions';

const initialState: DoctorsServicesStateInterface = {
  isLoading: false,
  services: null,
  templates: null,
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
    })),
    on(doctorsServicesActions.editServiceSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(doctorsServicesActions.editSerivceFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

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
    }))
  ),
});

export const {
  name: doctorsServicesFeatureKey,
  reducer: doctorsServicesReducer,
  selectServices,
  selectTemplates,
} = doctorsServicesFeature;
