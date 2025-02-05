import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { UserStateInterface } from '../../models/userState.interface';

const initialState: UserStateInterface = {
  isLoading: false,
  currentUser: null,
  error: null,
};

const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(userActions.loadUser, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(userActions.loadUserSuccess, (state, action) => ({
      ...state,
      currentUser: action.user,
      isLoading: false,
    })),
    on(userActions.loadUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),

    on(userActions.updateUser, (state, action) => ({
      ...state,
      currentUser: action.user,
    })),
    on(userActions.logOut, (state) => ({
      ...state,
      currentUser: null,
    }))
  ),
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectCurrentUser,
} = userFeature;
