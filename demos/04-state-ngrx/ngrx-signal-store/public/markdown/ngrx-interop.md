Interoperability with NgRx Classic is demonstrated on the `Skills` route in `skills-container.component.ts`. `toSignal()` is used to convert the `skills` observable to a readable signal. 

```typescript
skills = toSignal(this.service.entities$.pipe(
    combineLatestWith(this.fcToggle.valueChanges.pipe(startWith(true))),
    map(([skills, showAll]) => {
        return showAll ? skills : skills.filter((sk: Skill) => sk.completed === showAll);
    })
));
```

`skill-row.component.ts` input and output functions as well as a mock of a side effect that replaces the pattern of `ngOnChanges` 

```typescript
onNewSkill = effect(() => {
    console.log('ngOnChanges mock - new skill:', this.skill);
}); 
```

NgRx provides a selectSignal-method to allow fetching NgRx State as Signals. This is available for classic NgRx as well as NgRx Component Store

```typescript
store = inject(Store) as Store<CustomersState>;
customers = this.store.selectSignal(getCustomers);
```