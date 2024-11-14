- Examine how route bindings work in Angular 16 using the new option used in the router module:

```typescript
provideRouter(
    appRoutes,
    withComponentInputBinding(),
    ...
),
```

- Examine `customer-edit.component.ts`:

```typescript
export class CustomerEditComponent {
  id = input.required<number>();
  readonly = input<boolean>(false);

  store = inject(Store);
  customer = this.store.select(customerState.selectCustomers).pipe(
    mergeMap(
      (customers) => customers.filter(c => c.id == this.id())
    ));
}
```
