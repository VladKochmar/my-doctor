import { createFeature, createReducer, on } from '@ngrx/store';
import { DoctorsServicesStateInterface } from '../../models/doctorsServicesState.interface';
import { doctorsServicesActions } from './doctors-services.actions';

const initialState: DoctorsServicesStateInterface = {
  isLoading: false,
  services: null,
};

const doctorsServicesFeature = createFeature({
  name: 'doctorsServices',
  reducer: createReducer(
    initialState,
    on(doctorsServicesActions.loadDoctorServices, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(doctorsServicesActions.loadDoctorServicesSuccess, (state, aciton) => ({
      services: aciton.services,
      isLoading: false,
    })),
    on(doctorsServicesActions.loadDoctorServicesFailure, (state) => ({
      isLoading: false,
      services: null,
    })),

    on(doctorsServicesActions.deleteDoctorService, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(doctorsServicesActions.deleteDoctorServiceSuccess, (state, action) => ({
      services: state.services
        ? state.services.filter((service) => service.id !== action.id)
        : null,
      isLoading: false,
    })),
    on(doctorsServicesActions.deleteDoctorServiceFailure, (state) => ({
      isLoading: false,
      services: null,
    }))
  ),
});

export const {
  name: doctorsServicesFeatureKey,
  reducer: doctorsServicesReducer,
  selectServices,
} = doctorsServicesFeature;
