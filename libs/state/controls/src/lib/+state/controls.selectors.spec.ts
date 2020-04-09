import { ControlsEntity } from './controls.models';
import { State, controlsAdapter, initialState } from './controls.reducer';
import * as ControlsSelectors from './controls.selectors';

describe('Controls Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getControlsId = it => it['id'];
  const createControlsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ControlsEntity);

  let state;

  beforeEach(() => {
    state = {
      controls: controlsAdapter.addAll(
        [
          createControlsEntity('PRODUCT-AAA'),
          createControlsEntity('PRODUCT-BBB'),
          createControlsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Controls Selectors', () => {
    it('getAllControls() should return the list of Controls', () => {
      const results = ControlsSelectors.getAllControls(state);
      const selId = getControlsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ControlsSelectors.getSelected(state);
      const selId = getControlsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getControlsLoaded() should return the current 'loaded' status", () => {
      const result = ControlsSelectors.getControlsLoaded(state);

      expect(result).toBe(true);
    });

    it("getControlsError() should return the current 'error' state", () => {
      const result = ControlsSelectors.getControlsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
