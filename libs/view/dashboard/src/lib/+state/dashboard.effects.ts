import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs';
import { TemperatureService } from '@pool/api';

@Injectable()
export class DashboardEffects {
  loadCurrentTemperature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadCurrentTemperature),
      fetch({
        run: action => {
          return this.temperatureService
            .getCurrentTemperature()
            .pipe(
              map(currentTemperatures =>
                DashboardActions.loadCurrentTemperatureSuccess({
                  currentTemperatures
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DashboardActions.loadCurrentTemperatureFailure({ error });
        }
      })
    )
  );

  polling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.startPolling),
      switchMap(() =>
        timer(0, 30 * 1000).pipe(
          map(() => DashboardActions.loadCurrentTemperature()),
          takeUntil(this.actions$.pipe(ofType(DashboardActions.endPolling)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private temperatureService: TemperatureService
  ) {}
}
