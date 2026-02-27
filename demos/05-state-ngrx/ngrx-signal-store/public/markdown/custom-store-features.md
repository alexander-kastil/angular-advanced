SignalStore can be extended with custom features. This is done by creating a new function that returns a `signalStoreFeature`. It can contain `state` and `computed properties`. 

```typescript
export function withRequestStatus() {
    return signalStoreFeature(
        withState<RequestStatusState>({ requestStatus: 'idle' }),
        withComputed(({ requestStatus }) => ({
            isPending: computed(() => requestStatus() === 'pending'),
            isFulfilled: computed(() => requestStatus() === 'fulfilled'),
            error: computed(() => {
                const status = requestStatus();
                return typeof status === 'object' ? status.error : null;
            }),
        }))
    );
}
```

To enable tree-shaking and optimal use state is modified using pure functions.

```typescript
export function setPending(): RequestStatusState {
    return { requestStatus: 'pending' };
}
```