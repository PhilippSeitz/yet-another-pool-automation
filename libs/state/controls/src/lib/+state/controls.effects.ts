import { Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType,
  ROOT_EFFECTS_INIT,
  OnInitEffects
} from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { tap } from 'rxjs/operators';

import * as fromControls from './controls.reducer';
import * as ControlsActions from './controls.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class ControlsEffects implements OnInitEffects {
  loadControls$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ControlsActions.loadControls),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ControlsActions.loadControlsSuccess({ controls: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ControlsActions.loadControlsFailure({ error });
        }
      })
    )
  );

  init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => console.log('wuhu'))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}

  ngrxOnInitEffects(): Action {
    return ControlsActions.loadControls();
  }
}
