The Markdown Editor store composes the custom features we built (`withLoadingState` and `withMarkdownItems`) into a real-world store. Open the side panel's Markdown Editor to see it in action.

## Store Composition

Examine `markdown-editor.store.ts` — it composes two custom features:

```typescript
export const markdownEditorStore = signalStore(
    { providedIn: 'root' },
    withLoadingState(),
    withMarkdownItems(),
    withMethods((store) => ({
        setLoading(isLoading: boolean) {
            patchState(store, { isLoading });
        },
    })),
    withHooks({
        onInit({ fetchComments }) {
            fetchComments();
        },
    })
);
```

## withMarkdownItems Feature

Examine `with-markdown-items.ts` — entity management with CRUD via `rxMethod`:

```typescript
export function withMarkdownItems() {
    return signalStoreFeature(
        withEntities<MarkdownItem>(),
        withMethods((store, service = inject(MarkdownEditorService)) => ({
            fetchComments: rxMethod<void>(...),
            saveComment: rxMethod<MarkdownItem>(...),
            deleteComment: rxMethod<MarkdownItem>(...),
        }))
    );
}
```

Uses entity updaters: `addEntities`, `setEntity`, `removeEntity`

## withLoadingState Feature

Examine `with-loading-state.ts` — reusable loading state with computed signal:

```typescript
export function withLoadingState() {
    return signalStoreFeature(
        withState<LoadingState>({ isLoading: false }),
        withComputed(({ isLoading }) => ({
            isLoading: computed(() => isLoading()),
        }))
    );
}
```

## Key Takeaway

Custom features let you compose stores from reusable building blocks — each feature encapsulates its own state, computed properties, and methods.
