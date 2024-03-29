import { createReducer, on, Action } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';
import { TemperatureData, TemperatureSnapshot } from '@pool/data';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  loaded: boolean; // has the Dashboard list been loaded
  currentTemperatures: TemperatureSnapshot[];
  historyTemperatures: TemperatureSnapshot[];
  historyTemperaturesValues: TemperatureData[];
  error?: string | null; // last none error (if any)
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: false,
  currentTemperatures: [],
  historyTemperatures: [],
  historyTemperaturesValues: []
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadCurrentTemperature, state => ({
    ...state,
    error: null
  })),
  on(
    DashboardActions.loadCurrentTemperatureSuccess,
    (state, { currentTemperatures }) => ({
      ...state,
      currentTemperatures
    })
  ),
  on(
    DashboardActions.loadHistoryTemperatureSuccess,
    (state, { historyTemperatures, values }) => ({
      ...state,
      historyTemperatures,
      historyTemperaturesValues: values
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
