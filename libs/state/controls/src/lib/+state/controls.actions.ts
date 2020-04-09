import { createAction, props } from '@ngrx/store';
import { ControlsEntity } from './controls.models';

export const loadControls = createAction('[Controls] Load Controls');

export const loadControlsSuccess = createAction(
  '[Controls] Load Controls Success',
  props<{ controls: ControlsEntity[] }>()
);

export const loadControlsFailure = createAction(
  '[Controls] Load Controls Failure',
  props<{ error: any }>()
);
