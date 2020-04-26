import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DashboardEntity } from './dashboard.models';
import { DashboardEffects } from './dashboard.effects';
import { DashboardFacade } from './dashboard.facade';

import * as DashboardSelectors from './dashboard.selectors';
import * as DashboardActions from './dashboard.actions';
import {
  DASHBOARD_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './dashboard.reducer';

interface TestSchema {
  dashboard: State;
}

describe('DashboardFacade', () => {
  let facade: DashboardFacade;
  let store: Store<TestSchema>;
  const createDashboardEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as DashboardEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DASHBOARD_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DashboardEffects])
        ],
        providers: [DashboardFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(DashboardFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allDashboard$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(DashboardActions.loadCurrentTemperature());

        list = await readFirst(facade.allDashboard$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCurrentTemperatureSuccess` to manually update list
     */
    it('allDashboard$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allDashboard$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          DashboardActions.loadCurrentTemperatureSuccess({
            dashboard: [
              createDashboardEntity('AAA'),
              createDashboardEntity('BBB')
            ]
          })
        );

        list = await readFirst(facade.allDashboard$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
