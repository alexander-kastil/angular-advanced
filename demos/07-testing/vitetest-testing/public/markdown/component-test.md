Navigate to folder `\\component-test\\simple-food` and examine `simple-food.component.ts` & `simple-food.component.spec.ts`

Navigate to folder `\\demos\\food\\`: `food.service.ts`

Use `jasmine.createSpyObj()` to create a mock service and provide it via `TestBed`:

```typescript\nbeforeEach(async () => {\n  mockFS = jasmine.createSpyObj(['getItems', 'deleteItem']);\n  await TestBed.configureTestingModule({\n    imports: [SimpleFoodComponent],\n    providers: [{ provide: FoodService, useValue: mockFS }]\n  }).compileComponents();\n});\n```\n\nFake the return value using `.and.returnValue`:\n\n```typescript\nmockFS.deleteItem.and.returnValue(of(serviceResult));\n```\n\nVerify the service interaction:\n\n```typescript\nexpect(mockFS.deleteItem).toHaveBeenCalledWith(foodData[3]);\n```
