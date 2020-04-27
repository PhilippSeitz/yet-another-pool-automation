import { createAction, props } from '@ngrx/store';
import { TemperatureSnapshot, TemperatureData } from '@pool/data';

export const loadCurrentTemperature = createAction(
  '[Dashboard] Load Current Temperature'
);

export const loadHistoryTemperature = createAction(
  '[Dashboard] Load History Temperature'
);

export const startPolling = createAction('[Dashboard] Start Polling');
export const endPolling = createAction('[Dashboard] End Polling');

export const loadCurrentTemperatureSuccess = createAction(
  '[Dashboard] Load Current Temperature Success',
  props<{ currentTemperatures: TemperatureSnapshot[] }>()
);

export const loadCurrentTemperatureFailure = createAction(
  '[Dashboard] Load Current Temperature Failure',
  props<{ error: any }>()
);

export const loadHistoryTemperatureSuccess = createAction(
  '[Dashboard] Load History Temperature Success',
  props<{
    historyTemperatures: TemperatureSnapshot[];
    values: TemperatureData[];
  }>()
);

export const loadHistoryTemperatureFailure = createAction(
  '[Dashboard] Load History Temperature Failure',
  props<{ error: any }>()
);
