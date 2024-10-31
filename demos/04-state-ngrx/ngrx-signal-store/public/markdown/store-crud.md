Examine the `Customers` route and it's definition of `customers.store.ts` and `customers.service.ts`. 

It uses `withMethods` to define custom methods for the store and `rxMethod` to handle async reactivity and integrate `RxJs operators` and to handle the response. Finally it uses `patchState` to update the state. 

`withHooks` is used to fetch the customers from the service and update the state in the `onInit` lifecycle hook.


```typescript
withMethods((store, service = inject(CustomersService)) => ({
    fetchCustomers: rxMethod<void>(
        pipe(
            switchMap(() => {
                patchState(store, { loading: true });
                return service.getCustomers().pipe(
                    tapResponse({
                        next: (customers) => patchState(store, { customers }),
                        error: logError,
                        finalize: () => patchState(store, { loading: false }),
                    })
                );
            })
        )),
    getById: (id: number) => {
        return store.customers().find(c => c.id === id)
    },
```