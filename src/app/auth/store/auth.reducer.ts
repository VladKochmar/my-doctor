import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../models/authState.interface';
import { authActions } from './auth.actions';

const initialState: AuthStateInterface = {
  error: null,
  isSubmitting: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, authActions.logIn, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      error: null,
    })),
    on(
      authActions.registerFailure,
      authActions.logInFailure,
      (state, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
        error: action.error || null,
      })
    ),
    on(authActions.registerSuccess, authActions.logInSuccess, (state) => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
      error: null,
    })),
    on(authActions.clearErrors, (state) => ({
      ...state,
      validationErrors: null,
      error: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectValidationErrors,
  selectIsSubmitting,
  selectError,
} = authFeature;
