import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { customersActions } from '../../../customers/state/customers.actions';
import { CustomersState, customerState } from '../../../customers/state/customers.state';
import { BorderDirective } from '../../../shared/formatting/formatting-directives';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-select-signal',
  standalone: true,
  imports: [MarkdownRendererComponent, BorderDirective],
  templateUrl: './select-signal.component.html',
  styleUrl: './select-signal.component.scss'
})
export class SelectSignalComponent {
  store = inject(Store) as Store<CustomersState>;
  customers = this.store.selectSignal(customerState.selectCustomers);

  ngOnInit(): void {
    this.store.dispatch(customersActions.loadCustomers());
  }
}
