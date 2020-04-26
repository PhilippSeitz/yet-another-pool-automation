import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';
import * as dashboardActions from './dashboard.actions';
import { Sensor } from '@pool/data';

@Injectable()
export class DashboardFacade {
  loaded$ = this.store.pipe(select(DashboardSelectors.getDashboardLoaded));
  poolTemperature$ = this.store.pipe(
    select(DashboardSelectors.getCurrentTemp, { location: Sensor.POOL })
  );

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
