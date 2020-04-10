import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromControls from './controls.reducer';
import * as ControlsSelectors from './controls.selectors';
import * as ControlActions from './controls.actions';

@Injectable()
export class ControlsFacade {
  loaded$ = this.store.pipe(select(ControlsSelectors.getControlsLoaded));
  allControls$ = this.store.pipe(select(ControlsSelectors.getAllControls));

  constructor(private store: Store<fromControls.ControlsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  toggleControl(id: string) {
    this.dispatch(ControlActions.toggleControl({ id }));
  }

  selectControlById(id: string) {
    return this.store.pipe(select(ControlsSelectors.getControlById, { id }));
  }
}
