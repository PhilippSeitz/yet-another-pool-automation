import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ControlsEntity } from './controls.models';
import { ControlsEffects } from './controls.effects';
import { ControlsFacade } from './controls.facade';

import * as ControlsSelectors from './controls.selectors';
import * as ControlsActions from './controls.actions';
import {
  CONTROLS_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './controls.reducer';

interface TestSchema {
  controls: State;
}

describe('ControlsFacade', () => {
  let facade: ControlsFacade;
  let store: Store<TestSchema>;
  const createControlsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ControlsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONTROLS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ControlsEffects])
        ],
        providers: [ControlsFacade]
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
      facade = TestBed.get(ControlsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allControls$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ControlsActions.loadControls());

        list = await readFirst(facade.allControls$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadControlsSuccess` to manually update list
     */
    it('allControls$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allControls$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ControlsActions.loadControlsSuccess({
            controls: [createControlsEntity('AAA'), createControlsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allControls$);
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
