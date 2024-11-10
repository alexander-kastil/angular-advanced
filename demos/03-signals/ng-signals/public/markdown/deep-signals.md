Angular `Deep Signals` are a feature in Angular that allow for efficient state management, especially when dealing with nested objects. They are part of the `@ngrx/signal` library and are created with the `deepComputed()` function.

```typescript
export class DeepSignalsComponent {
  limit = signal(10);
  current = signal(0);
  totalItems = signal(100);

  pagination = deepComputed(() => ({
      currentPage: this.current(),
      pageSize: this.limit(),
      totalPages: Math.ceil(this.totalItems() / this.limit()),
  }));
```