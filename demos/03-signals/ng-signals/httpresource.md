# httpResource Migration

Angular 19+ introduced `httpResource()` — a signal-based wrapper around `HttpClient` that exposes reactive state (`value()`, `isLoading()`, `error()`) without Observables or manual subscription management.

## Why migrate?

| Old pattern | Problem | With httpResource |
|---|---|---|
| `Observable` + `async` pipe | Requires `AsyncPipe` import, `| async` in template | Signal read directly in template with `value()` |
| `toSignal(http.get(...))` | Two-step: Observable → Signal conversion | Single declaration |
| `effect()` + `.subscribe()` | Manual subscription, side-effectful | Reactive params — refetches automatically when signal changes |
| Multiple fields per resource | `data$`, `loading`, `error` signals managed manually | Built-in `isLoading()`, `error()`, `hasValue()` |

---

## Migrated Use Cases

### 1. `SideNavService` — navigation items

**File:** `src/app/shared/sidenav/sidenav.service.ts`

**Before:**
```ts
getTopItems(): Observable<NavItem[]> {
  return this.http.get<NavItem[]>(`${environment.api}top-links`);
}
```

**After:**
```ts
topItems = httpResource<NavItem[]>(() => `${environment.api}top-links`);
```

**Why:** `getTopItems()` was a pure GET used only in `NavbarComponent` via `| async`. Converting to a `httpResource` property removes the Observable method, the `async` pipe from the template, and `AsyncPipe` from component imports. The navbar template now reads `ms.topItems.value()` directly.

**Also removed:** `navbar.service.ts` — this file also declared a `getTopItems()` method but was never imported anywhere. Deleted entirely.

---

### 2. `DemoContainerComponent` — sidenav demo list

**File:** `src/app/demos/demo-container/demo-container.component.ts`

**Before:**
```ts
ds = inject(DemoService);
demos = this.ds.getItems(); // Observable<DemoItem[]>
```
Template: `@for (item of demos | async; track item)`

**After:**
```ts
demosResource = httpResource<DemoItem[]>(() => `${environment.api}demos`);
```
Template: `@for (item of demosResource.value(); track item)`

**Why:** `DemoService.getItems()` was the only `DemoService` call in this component. After migrating, the component no longer injects `DemoService`. The `DemoService` itself is retained because `demos.effects.ts` still uses it for NgRx CRUD effects.

---

### 3. `SignalEffectsComponent` — reactive filter with effect

**File:** `src/app/demos/samples/signal-effects/signal-effects.component.ts`

**Before:**
```ts
service = inject(SkillsService);
skills = signal<Skill[]>([]);

completedEffect = effect(() => {
  const filter = this.completedFilter();
  if (filter !== undefined) {
    this.service.getSkillsByCompletion(filter).subscribe(skills => {
      this.skills.set(skills);
    });
  }
});
```

**After:**
```ts
skillsResource = httpResource<Skill[]>(() => {
  const filter = this.completedFilter();
  return filter !== undefined
    ? `${environment.api}skills?completed=${filter}`
    : undefined;
}, { defaultValue: [] });
```

**Why:** This is the canonical `httpResource` use case. The `effect()` + `.subscribe()` + manual `signal.set()` pattern is eliminated. Returning `undefined` from the request function puts the resource into `idle` state (no fetch), replacing the `if (filter !== undefined)` guard. The resource automatically refetches whenever `completedFilter` changes.

---

### 4. `ZonelessChangeDetectionComponent` — Observable + toSignal

**File:** `src/app/demos/samples/zoneless-change-detection/zoneless-change-detection.component.ts`

**Before:**
```ts
http = inject(HttpClient);         // injected but never used directly
service = inject(SkillsService);

skills = this.service.getSkills().pipe(map(skills => skills.slice(0, 2)));      // Observable for async pipe
sigSkills = toSignal(this.service.getSkills().pipe(map(skills => skills.slice(0, 2)))); // duplicate call
```
Template used both `skills | async` and `sigSkills()`.

**After:**
```ts
skillsResource = httpResource<Skill[]>(() => `${environment.api}skills`);
skills = computed(() => (this.skillsResource.value() ?? []).slice(0, 2));
```

**Why:** Two HTTP calls were made for the same data — one for the `async` pipe, one for `toSignal`. Both are replaced by a single `httpResource` and a `computed()` for the slice. Dead code (`http = inject(HttpClient)`) removed. `AsyncPipe` and `toSignal` imports removed.

---

### 5. `ContainerPresenterSignalsComponent` — toSignal initial fetch

**File:** `src/app/demos/samples/container-presenter/container-presenter-signals.component.ts`

**Before:**
```ts
ps = inject(PersonService);
persons = toSignal(this.ps.getPersons(), { initialValue: [] });
```

**After:**
```ts
personsResource = httpResource<Person[]>(() => `${environment.api}persons`, { defaultValue: [] });
```

Template updated to `personsResource.value()`. The `onPersonSaved` handler uses `personsResource.update()` for immutable local state updates.

**Why:** `toSignal()` wrapping a one-time Observable GET is exactly what `httpResource` is designed for. The component no longer needs `PersonService`, `toSignal`, or the `inject` call.

---

## Services Removed

| File | Reason |
|---|---|
| `src/app/shared/navbar/navbar.service.ts` | Never imported or used anywhere in the application |
| `src/app/demos/samples/container-presenter/person.service.ts` | Only consumer (`ContainerPresenterSignalsComponent`) migrated to `httpResource` directly; service became entirely unused |

## Methods Removed

| Service | Method | Reason |
|---|---|---|
| `SkillsService` | `getSkills()` | Only callers migrated to `httpResource` |
| `SkillsService` | `getSkillsByCompletion()` | Only caller (`SignalEffectsComponent`) migrated to `httpResource` |

`SkillsService` is retained because `getSkill()`, `addSkill()`, and `deleteSkill()` are still used by `SkillsEntityService`.
