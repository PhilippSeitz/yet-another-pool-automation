import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromControls from './controls.reducer';
import * as ControlsSelectors from './controls.selectors';

@Injectable()
export class ControlsFacade {
  loaded$ = this.store.pipe(select(ControlsSelectors.getControlsLoaded));
  allControls$ = this.store.pipe(select(ControlsSelectors.getAllControls));
  selectedControls$ = this.store.pipe(select(ControlsSelectors.getSelected));

  constructor(private store: Store<fromControls.ControlsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
