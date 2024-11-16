import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { setFulfilled, setPending, withRequestStatus } from '../shared/request-status/request-status.feature';
import { DemoItem } from './demo-base/demo-item.model';
import { DemoService } from './demo-base/demo.service';

type DemoState = {
    selected: DemoItem | null;
    filter: string;
};

export const initialDemoState: DemoState = {
    selected: null,
    filter: '',
};

const logError = (error: Error) => console.error("error: ", error);

export const demoStore = signalStore(
    withState(initialDemoState),
    withEntities<DemoItem>(),
    withRequestStatus(),
    withMethods((store, service = inject(DemoService)) => ({
        setSelected: (selected: DemoItem) => {
            patchState(store, { selected });
        },
        setFilter: (filter: string) => {
            patchState(store, { filter });
        },
        fetchDemos: rxMethod<void>(
            pipe(
                switchMap(() => {
                    patchState(store, setPending());
                    return service.getDemos().pipe(
                        tapResponse({
                            next: (demos) => patchState(store, setEntities(demos)),
                            error: logError,
                            finalize: () => patchState(store, setFulfilled()),
                        })
                    );
                })),
        )
    })),
    withComputed((store) => ({
        filteredDemos: computed(() =>
            store.filter() === ''
                ? store.entities()
                : store.entities().filter((demo) => demo.title.includes(store.filter()))
        ),
    })),
    withHooks({
        onInit({ fetchDemos }) {
            fetchDemos();
        },
    })
);