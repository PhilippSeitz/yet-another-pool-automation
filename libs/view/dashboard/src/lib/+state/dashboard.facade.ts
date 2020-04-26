import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';
import * as dashboardActions from './dashboard.actions';

@Injectable()
export class DashboardFacade {
  loaded$ = this.store.pipe(select(DashboardSelectors.getDashboardLoaded));

  constructor(private store: Store<fromDashboard.DashboardPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  startPolling() {
    this.store.dispatch(dashboardActions.startPolling());
  }

  endPolling() {
    this.store.dispatch(dashboardActions.endPolling());
  }
}
