import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs';

@Injectable()
export class DashboardEffects {
  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DashboardActions.loadDashboardSuccess({ dashboard: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DashboardActions.loadDashboardFailure({ error });
        }
      })
    )
  );

  polling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.startPolling),
      switchMap(() =>
        timer(0, 30 * 1000).pipe(
          map(() => DashboardActions.loadDashboard()),
          takeUntil(this.actions$.pipe(ofType(DashboardActions.endPolling)))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
