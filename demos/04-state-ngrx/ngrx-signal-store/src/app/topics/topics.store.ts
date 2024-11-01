import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Topic } from './topic.model';
import { TopicsService } from './topics.service';

const logError = (error: Error) => console.error("error: ", error);

type topicsState = {
    loading: boolean;
}

const initialTopicsState: topicsState = {
    loading: false,
};

export const topicsStore = signalStore(
    withState(initialTopicsState),
    withEntities<Topic>(),
    withMethods((store, service = inject(TopicsService)) => ({
        fetchTopics: rxMethod<void>(
            pipe(
                switchMap(() => {
                    patchState(store, { loading: true });
                    return service.getTopics().pipe(
                        tapResponse({
                            next: (topics) => patchState(store, setEntities(topics)),
                            error: logError,
                            finalize: () => patchState(store, { loading: false }),
                        })
                    );
                })
            )),
        updateTopic: (topic: Topic) => {
            service.updateTopic(topic).subscribe((updatedTopic) => {
                patchState(store, updateEntity({ id: updatedTopic.id, changes: updatedTopic }));
            }
            );
        },
    })),
    withHooks({
        onInit({ fetchTopics }) {
            fetchTopics();
        },
    })
)