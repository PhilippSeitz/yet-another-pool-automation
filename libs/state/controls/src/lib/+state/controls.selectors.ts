import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTROLS_FEATURE_KEY,
  State,
  ControlsPartialState,
  controlsAdapter
} from './controls.reducer';

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

export const getSelectedId = createSelector(
  getControlsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getControlsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
