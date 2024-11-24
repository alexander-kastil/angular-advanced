import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { customersStore } from '../customers.store';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    imports: [
        MatButton,
        RouterLink
    ]
})
export class CustomersComponent {
  store = inject(customersStore);
  customers = this.store.customers;
}
