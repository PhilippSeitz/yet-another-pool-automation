import { createAction, props } from '@ngrx/store';
import { Control, ControlUpdate } from '@pool/data';

export const loadControls = createAction('[Controls] Load Controls');

export const loadControlsSuccess = createAction(
  '[Controls] Load Controls Success',
  props<{ controls: Control[] }>()
);

export const loadControlsFailure = createAction(
  '[Controls] Load Controls Failure',
  props<{ error: any }>()
);

export const toggleControl = createAction(
  '[Controls] Toggle Control',
  props<{ id: string }>()
);

export const updateControl = createAction(
  '[Controls] Update Control',
  props<{ update: ControlUpdate }>()
);
