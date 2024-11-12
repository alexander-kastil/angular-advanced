Angular 18 introduced a new feature called `Unified Control Events` that represent a way to listen to events on a form control using a single subscription. 

This is useful when you want to listen to events on a form control and react to them. 

It provides the following event types:

```typescript
this.name.events.subscribe((event: ControlEvent) => {
    if (event instanceof ValueChangeEvent) {
    this.events.set('ValueChangeEvent', event.value);
    }
    if (event instanceof StatusChangeEvent) {
    this.events.set('StatusChangeEvent', event.status);
    }
    if (event instanceof TouchedChangeEvent) {
    this.events.set('TouchedChangeEvent', event.touched);
    }
    if (event instanceof PristineChangeEvent) {
    this.events.set('PristineChangeEvent', event.pristine);
    }
}
);
```