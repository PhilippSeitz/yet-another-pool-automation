import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DASHBOARD_FEATURE_KEY,
  State,
  DashboardPartialState
} from './dashboard.reducer';
import { Sensor } from '@pool/data';
import { Props } from '@ngrx/store/src/models';

// Lookup the 'Dashboard' feature state managed by NgRx
export const getDashboardState = createFeatureSelector<
  DashboardPartialState,
  State
>(DASHBOARD_FEATURE_KEY);

export const getDashboardLoaded = createSelector(
  getDashboardState,
  (state: State) => state.loaded
);

export const getDashboardError = createSelector(
  getDashboardState,
  (state: State) => state.error
);

export const getCurrentTemp = createSelector(
  getDashboardState,
  (state: State, props: { location: Sensor }) =>
    state.currentTemperatures.find(temp => temp.location === props.location)
);

export const getHistoryTemp = createSelector(
  getDashboardState,
  (state: State, props: { location: Sensor }) =>
    state.historyTemperatures.find(temp => temp.location === props.location)
);

export const getHistoryTempValues = createSelector(
  getDashboardState,
  (state: State, props: { location: Sensor }) =>
    state.historyTemperaturesValues.filter(
      temp => temp.location === props.location
    )
);
