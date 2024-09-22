- Examine `skill-row.component.ts` and its use of Signal inputs and outputs that replaces classic `@Input()` and `@Output()` decorators.

- `input` can be required or optional. If optional it can be set to a default value using `x = input<number>(0);`

```typescript
export class SkillRowComponent {
  skill = input.required<Skill>();
  itemDeleted = output<Skill>();
  itemCompleted = output<Skill>();
}
```