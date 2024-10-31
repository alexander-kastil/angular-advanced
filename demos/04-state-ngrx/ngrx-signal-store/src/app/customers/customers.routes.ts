import { Routes } from '@angular/router';
import { CustomersComponent } from './component/customer-list/customers.component';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';

export const customerRoutes: Routes = [
    {
        path: '',
        component: CustomersComponent
    },
    {
        path: ':id',
        component: CustomerEditComponent,
    }
];

