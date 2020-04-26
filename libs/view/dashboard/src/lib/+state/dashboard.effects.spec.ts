import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DashboardEffects } from './dashboard.effects';
import * as DashboardActions from './dashboard.actions';

describe('DashboardEffects', () => {
  let actions: Observable<any>;
  let effects: DashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DashboardEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(DashboardEffects);
  });

  describe('loadCurrentTemperature$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DashboardActions.loadCurrentTemperature() });

      const expected = hot('-a-|', {
        a: DashboardActions.loadCurrentTemperatureSuccess({ dashboard: [] })
      });

      expect(effects.loadCurrentTemperature$).toBeObservable(expected);
    });
  });
});
