import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  http = inject(HttpClient);

  getCustomers() {
    return this.http.get<Customer[]>(environment.api + 'customers');
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(environment.api + 'customers/' + id);
  }

  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(environment.api + 'customers/' + customer.id, customer);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(environment.api + 'customers/' + customer.id);
  }

  createCustomer(customer: Customer) {
    return this.http.post<Customer>(environment.api + 'customers', customer);
  }
}
