import { ControlsEntity } from './controls.models';
import * as ControlsActions from './controls.actions';
import { State, initialState, reducer } from './controls.reducer';

describe('Controls Reducer', () => {
  const createControlsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ControlsEntity);

  beforeEach(() => {});

  describe('valid Controls actions', () => {
    it('loadControlsSuccess should return set the list of known Controls', () => {
      const controls = [
        createControlsEntity('PRODUCT-AAA'),
        createControlsEntity('PRODUCT-zzz')
      ];
      const action = ControlsActions.loadControlsSuccess({ controls });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
