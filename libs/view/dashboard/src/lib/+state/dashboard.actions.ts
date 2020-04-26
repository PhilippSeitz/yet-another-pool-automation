import { createAction, props } from '@ngrx/store';

export const loadDashboard = createAction('[Dashboard] Load Dashboard');

export const startPolling = createAction('[Dashboard] Start Polling');
export const endPolling = createAction('[Dashboard] End Polling');

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ dashboard: any[] }>()
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: any }>()
);
