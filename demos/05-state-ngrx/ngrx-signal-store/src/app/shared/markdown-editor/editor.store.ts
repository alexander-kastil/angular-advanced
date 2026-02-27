import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { CommentItem } from './comment.model';
import { CommentService } from './comment.service';

type EditorState = {
    comments: CommentItem[];
    loaded: boolean;
};

const initialEditorState: EditorState = {
    comments: [],
    loaded: false,
};

const logError = (error: Error) => console.error('error: ', error);

export const editorStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialEditorState),
    withMethods((store, service = inject(CommentService)) => ({
        fetchComments: rxMethod<void>(
            pipe(
                switchMap(() => {
                    return service.getComments().pipe(
                        tapResponse({
                            next: (comments) => patchState(store, { comments, loaded: true }),
                            error: logError,
                        })
                    );
                })
            )
        ),
        saveComment: rxMethod<CommentItem>(
            pipe(
                switchMap((item) => {
                    return service.saveComment(item).pipe(
                        tapResponse({
                            next: (saved) => {
                                const allComments = [...store.comments()];
                                const idx = allComments.findIndex(c => c.id === saved.id);
                                if (idx > -1) {
                                    allComments[idx] = saved;
                                } else {
                                    allComments.push(saved);
                                }
                                patchState(store, { comments: allComments });
                            },
                            error: logError,
                        })
                    );
                })
            )
        ),
        deleteComment: rxMethod<CommentItem>(
            pipe(
                switchMap((item) => {
                    return service.deleteComment(item).pipe(
                        tapResponse({
                            next: () => {
                                patchState(store, { comments: store.comments().filter(c => c.id !== item.id) });
                            },
                            error: logError,
                        })
                    );
                })
            )
        ),
    })),
    withHooks({
        onInit({ fetchComments }) {
            fetchComments();
        },
    })
);
