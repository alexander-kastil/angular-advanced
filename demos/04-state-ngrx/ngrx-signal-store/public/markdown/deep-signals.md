Angular `Deep Signals` are a feature in Angular that allow for efficient state management, especially when dealing with nested objects. They are part of the `@ngrx/signal` library and are created with the `deepComputed()` function.

```typescript
const user = deepComputed({
  name: 'John Doe',
  address: {
    street: 'Am Himmel 18',
    city: 'Vienna'
  }
});
```