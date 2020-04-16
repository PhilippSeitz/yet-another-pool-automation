import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { tap, map, withLatestFrom, flatMap, delay } from 'rxjs/operators';

import * as ControlsActions from './controls.actions';
import { Action } from '@ngrx/store';
import { ControlSocketService } from '../services/control-socket.service';
import { ControlsFacade } from './controls.facade';
import { of } from 'rxjs';

@Injectable()
export class ControlsEffects implements OnInitEffects {
  loadControls$ = createEffect(() =>
    this.controlSocketService.loaded$.pipe(
      map(controls => ControlsActions.loadControlsSuccess({ controls }))
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

  startQuickAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ControlsActions.startQuickAction),
        tap(() => this.controlSocketService.startQuickAction())
      ),
    {
      dispatch: false
    }
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
