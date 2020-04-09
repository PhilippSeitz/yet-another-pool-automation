import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ControlsActions from './controls.actions';
import { ControlsEntity } from './controls.models';

export const CONTROLS_FEATURE_KEY = 'controls';

export interface State extends EntityState<ControlsEntity> {
  selectedId?: string | number; // which Controls record has been selected
  loaded: boolean; // has the Controls list been loaded
  error?: string | null; // last none error (if any)
}

export interface ControlsPartialState {
  readonly [CONTROLS_FEATURE_KEY]: State;
}

export const controlsAdapter: EntityAdapter<ControlsEntity> = createEntityAdapter<
  ControlsEntity
>();

export const initialState: State = controlsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const controlsReducer = createReducer(
  initialState,
  on(ControlsActions.loadControls, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ControlsActions.loadControlsSuccess, (state, { controls }) =>
    controlsAdapter.addAll(controls, { ...state, loaded: true })
  ),
  on(ControlsActions.loadControlsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return controlsReducer(state, action);
}
