import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ControlsEffects } from './controls.effects';
import * as ControlsActions from './controls.actions';

describe('ControlsEffects', () => {
  let actions: Observable<any>;
  let effects: ControlsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ControlsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(ControlsEffects);
  });

  describe('loadControls$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ControlsActions.loadControls() });

      const expected = hot('-a-|', {
        a: ControlsActions.loadControlsSuccess({ controls: [] })
      });

      expect(effects.loadControls$).toBeObservable(expected);
    });
  });
});
