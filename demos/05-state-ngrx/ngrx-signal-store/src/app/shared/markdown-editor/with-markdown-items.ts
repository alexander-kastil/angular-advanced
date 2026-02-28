import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { MarkdownItem } from './markdown.model';
import { MarkdownEditorService } from './markdown-editor.service';
import { withEntities } from '@ngrx/signals/entities';
import { addEntities, removeEntity, setEntity } from '@ngrx/signals/entities';

const logError = (error: Error) => console.error('error: ', error);

export function withMarkdownItems() {
    return signalStoreFeature(
        withEntities<MarkdownItem>(),
        withMethods((store, service = inject(MarkdownEditorService)) => ({
            fetchMarkdownItems: rxMethod<void>(
                pipe(
                    switchMap(() =>
                        service.getMarkdownItems().pipe(
                            tapResponse({
                                next: (items) => patchState(store, addEntities(items)),
                                error: logError,
                            })
                        )
                    )
                )
            ),
            saveMarkdownItem: rxMethod<MarkdownItem>(
                pipe(
                    switchMap((item) =>
                        service.saveMarkdownItem(item).pipe(
                            tapResponse({
                                next: (saved) => patchState(store, setEntity(saved)),
                                error: logError,
                            })
                        )
                    )
                )
            ),
            deleteMarkdownItem: rxMethod<MarkdownItem>(
                pipe(
                    switchMap((item) =>
                        service.deleteMarkdownItem(item).pipe(
                            tapResponse({
                                next: () => patchState(store, removeEntity(item.id)),
                                error: logError,
                            })
                        )
                    )
                )
            ),
        }))
    );
}
