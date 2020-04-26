import { DashboardEntity } from './dashboard.models';
import * as DashboardActions from './dashboard.actions';
import { State, initialState, reducer } from './dashboard.reducer';

describe('Dashboard Reducer', () => {
  const createDashboardEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as DashboardEntity);

  beforeEach(() => {});

  describe('valid Dashboard actions', () => {
    it('loadDashboardSuccess should return set the list of known Dashboard', () => {
      const dashboard = [
        createDashboardEntity('PRODUCT-AAA'),
        createDashboardEntity('PRODUCT-zzz')
      ];
      const action = DashboardActions.loadDashboardSuccess({ dashboard });

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
