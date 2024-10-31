import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Customer } from '../customer.model';
import { pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { CustomersService } from '../customers.service';

export interface CustomersState {
    customers: Customer[];
    loading: boolean;
    filter: string;
}

export const initialCustomersState: CustomersState = {
    customers: [],
    loading: false,
    filter: '',
};

const logError = (error: Error) => console.error("error: ", error);

export const customersStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialCustomersState),
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
        updateCustomer: rxMethod<Customer>(
            pipe(
                switchMap((customer) => {
                    patchState(store, { loading: true });
                    return service.updateCustomer(customer).pipe(
                        tapResponse({
                            next: (customer) => {
                                const allCustomers = [...store.customers()];
                                const index = allCustomers.findIndex(c => c.id === customer.id);
                                allCustomers[index] = customer;
                                patchState(store, { customers: allCustomers });
                            },
                            error: logError,
                            finalize: () => patchState(store, { loading: false }),
                        })
                    );
                })
            )),
    })),
    withHooks({
        onInit({ fetchCustomers }) {
            fetchCustomers();
        },
    })
)
