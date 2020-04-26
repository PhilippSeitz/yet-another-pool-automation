import { createAction, props } from '@ngrx/store';
import { CurrentTemperature } from '@pool/data';

export const loadCurrentTemperature = createAction(
  '[Dashboard] Load Dashboard'
);

export const startPolling = createAction('[Dashboard] Start Polling');
export const endPolling = createAction('[Dashboard] End Polling');

export const loadCurrentTemperatureSuccess = createAction(
  '[Dashboard] Load Current Temperature Success',
  props<{ currentTemperatures: CurrentTemperature[] }>()
);

export const loadCurrentTemperatureFailure = createAction(
  '[Dashboard] Load Current Temperature Failure',
  props<{ error: any }>()
);
