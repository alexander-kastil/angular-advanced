Navigate to folder `\intro-unit-testing`

Investigate `simple-class.ts` and `simple-class.spec.ts`

Notice the First Test:

```typescript
it('contains 12 characters', function () {
  expect(SimpleClass.sayHelloWorld().length).toEqual(12);
});
```

Run the Test using browser or headless mode: 

```bash
ng test
ng test --browsers=ChromeHeadless
```

Additional intro samples: `voucher-validator.ts` and `voucher-validator.spec.ts`
