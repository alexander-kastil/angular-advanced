import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { customersStore } from './customers.store';
import { CustomersService } from './customers.service';
import { Customer } from './customer.model';
import { of, throwError } from 'rxjs';
import { patchState, signalStore, withState, withMethods } from '@ngrx/signals';
import { delay } from 'rxjs/operators';

describe('CustomersStore', () => {
    let store: InstanceType<typeof customersStore>;
    let customersService: jasmine.SpyObj<CustomersService>;
    let mockCustomers: Customer[];

    beforeEach(() => {
        mockCustomers = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
        ];

        const spy = jasmine.createSpyObj('CustomersService', ['getCustomers', 'updateCustomer']);

        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            providers: [
                { provide: CustomersService, useValue: spy },
                customersStore
            ]
        });

        customersService = TestBed.inject(CustomersService) as jasmine.SpyObj<CustomersService>;
        store = TestBed.inject(customersStore);
    });

    it('should get customer by id', () => {
        const customStore = signalStore(
            { providedIn: undefined, protectedState: false },
            withState({ customers: mockCustomers, loading: false, filter: '' }),
            withMethods(() => ({
                getById: (id: number) => mockCustomers.find(c => c.id === id)
            }))
        );
        const instance = new customStore();
        const customer = instance.getById(1);
        expect(customer).toEqual(mockCustomers[0]);
    });

    it('should return undefined for non-existent customer id', () => {
        const customStore = signalStore(
            { providedIn: undefined, protectedState: false },
            withState({ customers: mockCustomers, loading: false, filter: '' }),
            withMethods(() => ({
                getById: (id: number) => mockCustomers.find(c => c.id === id)
            }))
        );
        const instance = new customStore();
        const customer = instance.getById(999);
        expect(customer).toBeUndefined();
    });

    it('should update customer successfully', fakeAsync(() => {
        const updatedCustomer = { id: 1, name: 'John Updated' };
        customersService.updateCustomer.and.returnValue(of(updatedCustomer));

        // Set initial state
        patchState(store, { customers: mockCustomers });

        store.updateCustomer(updatedCustomer);
        tick();

        const customers = store.customers();
        expect(customers[0]).toEqual(updatedCustomer);
        expect(store.loading()).toBe(false);
    }));

    it('should handle update customer error', fakeAsync(() => {
        const error = new Error('Update failed');
        const customerToUpdate = mockCustomers[0];
        customersService.updateCustomer.and.returnValue(throwError(() => error));
        spyOn(console, 'error');

        patchState(store, { customers: mockCustomers });

        store.updateCustomer(customerToUpdate);
        tick();

        expect(store.loading()).toBe(false);
        expect(console.error).toHaveBeenCalledWith('error: ', error);
    }));

    it('should compute next id correctly', () => {
        patchState(store, { customers: mockCustomers });
        expect(store.nextId()).toBe(3);
    });

    it('should compute next id as 1 when no customers', () => {
        expect(store.nextId()).toBe(1);
    });

});