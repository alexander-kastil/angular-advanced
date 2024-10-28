import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { demoState, initialState, demosFeatureKey } from './demos.state';
import { demoActions } from './demos.actions';
import { DemoItem } from '../demo-base/demo-item.model';

describe('DemoState Reducer', () => {
    let store: MockStore;
    const arrDemos: DemoItem[] = [{ id: 1, visible: false, url: 'http://example.com', title: 'Demo Title', sortOrder: 1 }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({ initialState: { [demosFeatureKey]: initialState } })
            ]
        });

        store = TestBed.inject(MockStore);
    });

    it('should return the initial state', () => {
        const action = { type: 'NOOP' } as any;
        const result = demoState.reducer(initialState, action);
        expect(result).toBe(initialState);
    });

    it('should load demos successfully', () => {

        const action = demoActions.loadDemosSuccess({ demos: arrDemos });
        const result = demoState.reducer(initialState, action);
        expect(result.loaded).toBe(true);
        expect(result.ids.length).toBe(1);
    });

    it('should set selected demo', () => {
        const action = demoActions.setSelected({ demo: arrDemos[0] });
        const result = demoState.reducer(initialState, action);
        expect(result.selected).toBe(arrDemos[0]);
    });

    it('should apply filter', () => {
        const filter = 'test';
        const action = demoActions.applyFilter({ filter });
        const result = demoState.reducer(initialState, action);
        expect(result.filter).toBe(filter);
    });
});