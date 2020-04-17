import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ControlsActions from './controls.actions';
import { Control } from '@pool/data';

export const CONTROLS_FEATURE_KEY = 'controls';

export interface State extends EntityState<Control> {
  selectedId?: string | number; // which Controls record has been selected
  loaded: boolean; // has the Controls list been loaded
  error?: string | null; // last none error (if any)
  offline: boolean;
}

export interface ControlsPartialState {
  readonly [CONTROLS_FEATURE_KEY]: State;
}

export const controlsAdapter: EntityAdapter<Control> = createEntityAdapter<
  Control
>();

export const initialState: State = controlsAdapter.getInitialState({
  loaded: false,
  offline: true
});

const controlsReducer = createReducer(
  initialState,
  on(ControlsActions.loadControls, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ControlsActions.loadControlsSuccess, (state, { controls }) =>
    controlsAdapter.setAll(controls, { ...state, loaded: true })
  ),
  on(ControlsActions.loadControlsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ControlsActions.updateControl, (state, { update }) =>
    controlsAdapter.updateOne({ id: update.id, changes: update }, { ...state })
  ),
  on(ControlsActions.connected, state => ({ ...state, offline: false })),
  on(ControlsActions.disconnected, state => ({ ...state, offline: true }))
);

export function reducer(state: State | undefined, action: Action) {
  return controlsReducer(state, action);
}
