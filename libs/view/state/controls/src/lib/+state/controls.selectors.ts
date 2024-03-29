import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTROLS_FEATURE_KEY,
  State,
  ControlsPartialState,
  controlsAdapter
} from './controls.reducer';
import { Dictionary } from '@ngrx/entity';
import { Control } from '@pool/data';

// Lookup the 'Controls' feature state managed by NgRx
export const getControlsState = createFeatureSelector<
  ControlsPartialState,
  State
>(CONTROLS_FEATURE_KEY);

const { selectAll, selectEntities } = controlsAdapter.getSelectors();

export const getControlsLoaded = createSelector(
  getControlsState,
  (state: State) => state.loaded
);

export const getControlsError = createSelector(
  getControlsState,
  (state: State) => state.error
);

export const getAllControls = createSelector(getControlsState, (state: State) =>
  selectAll(state)
);

export const getControlsEntities = createSelector(
  getControlsState,
  (state: State) => selectEntities(state)
);

export const getControlById = createSelector(
  getControlsEntities,
  (entities: Dictionary<Control>, { id }: { id: string }) => entities[id]
);

export const isOffline = createSelector(
  getControlsState,
  state => state.offline
);
