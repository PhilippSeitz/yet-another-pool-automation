import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DashboardActions from './dashboard.actions';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  loaded: boolean; // has the Dashboard list been loaded
  error?: string | null; // last none error (if any)
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: false
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, state => ({
    ...state,
    error: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
