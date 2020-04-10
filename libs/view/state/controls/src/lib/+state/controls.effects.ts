import { Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType,
  ROOT_EFFECTS_INIT,
  OnInitEffects
} from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { tap, map, withLatestFrom, flatMap } from 'rxjs/operators';

import * as fromControls from './controls.reducer';
import * as ControlsActions from './controls.actions';
import { Action } from '@ngrx/store';
import { ControlSocketService } from '../services/control-socket.service';
import { ControlsFacade } from './controls.facade';
import { of } from 'rxjs';

@Injectable()
export class ControlsEffects implements OnInitEffects {
  loadControls$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ControlsActions.loadControls),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ControlsActions.loadControlsSuccess({
            controls: [
              { id: '1', name: 'Pumpe', on: false },
              { id: '2', name: 'Licht', on: true },
              { id: '3', name: 'Pool Licht', on: false },
              { id: '4', name: 'Gegenstromanlage', on: true }
            ]
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ControlsActions.loadControlsFailure({ error });
        }
      })
    )
  );

  toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ControlsActions.toggleControl),
      flatMap(action =>
        of(action).pipe(
          withLatestFrom(this.controlFacade.selectControlById(action.id)),
          map(([_, control]) => ({ ...control, on: !control.on }))
        )
      ),
      tap(control => this.controlSocketService.toggle(control)),
      map(update => ControlsActions.updateControl({ update }))
    )
  );

  update$ = createEffect(() =>
    this.controlSocketService.update$.pipe(
      map(update => ControlsActions.updateControl({ update }))
    )
  );

  constructor(
    private actions$: Actions,
    private controlSocketService: ControlSocketService,
    private controlFacade: ControlsFacade
  ) {}

  ngrxOnInitEffects(): Action {
    return ControlsActions.loadControls();
  }
}
