import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DashboardActions from './dashboard.actions';
import { map, switchMap, takeUntil, timeout } from 'rxjs/operators';
import { timer, of, forkJoin } from 'rxjs';
import { TemperatureService } from '@pool/api';

@Injectable()
export class DashboardEffects {
  loadCurrentTemperature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadCurrentTemperature),
      fetch({
        run: () => {
          return this.temperatureService.getCurrentTemperature().pipe(
            timeout(30000),
            map(currentTemperatures =>
              DashboardActions.loadCurrentTemperatureSuccess({
                currentTemperatures
              })
            )
          );
        },

        onError: (_, error) => {
          console.error('Error', error);
          return DashboardActions.loadCurrentTemperatureFailure({ error });
        }
      })
    )
  );

  loadHistoryTemperature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadHistoryTemperature),
      fetch({
        run: () => {
          return forkJoin([
            this.temperatureService.getLast24h(),
            this.temperatureService.getLast24hMinMaxMean()
          ]).pipe(
            map(([values, historyTemperatures]) => {
              return DashboardActions.loadHistoryTemperatureSuccess({
                historyTemperatures,
                values
              });
            })
          );
        },

        onError: (_, error) => {
          console.error('Error', error);
          return DashboardActions.loadHistoryTemperatureFailure({ error });
        }
      })
    )
  );

  polling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.startPolling),
      switchMap(() =>
        timer(0, 30 * 1000).pipe(
          switchMap(() => [
            DashboardActions.loadCurrentTemperature(),
            DashboardActions.loadHistoryTemperature()
          ]),
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
