`linkedSignal()` create a writable, reactive signal that changes a computation based on the value of another signal. 

```typescript
quantity = linkedSignal({
    source: this.selectedProduct,
    computation: () => 1
});
```

It can also be used to create a writable signal that has been created from an observable using `toSignal()`.

```typescript
products = linkedSignal(
    toSignal(this.http.get<Product[]>(`${environment.api}products`)));
```