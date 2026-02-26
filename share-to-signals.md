# BehaviorSubject to Signals Migration Summary

## Scope

Migrated all `BehaviorSubject`-based state management in `src/app/shared` to Angular signals.

## Before / After

### ThemeService

```typescript
// Before
private currTheme: BehaviorSubject<string> = new BehaviorSubject(this.theme);
getTheme(): Observable<string> { return this.currTheme; }

// After
private theme = signal('default');
readonly currentTheme = this.theme.asReadonly();
getTheme() { return this.currentTheme; }
```

### LoadingService

```typescript
// Before
private isLoading = new BehaviorSubject(false);
getLoading() { return this.isLoading.asObservable(); }
setLoading(loading: boolean) { this.isLoading.next(loading); }

// After
private isLoading = signal(false);
readonly loading = this.isLoading.asReadonly();
getLoading() { return this.loading; }
setLoading(loading: boolean) { this.isLoading.set(loading); }
```

### SidePanelService

```typescript
// Before
private commands: BehaviorSubject<SidebarActions> = new BehaviorSubject(SidebarActions.HIDE_MARKDOWN);
getCommands() { return this.commands; }
triggerCmd(action: SidebarActions) { this.commands.next(action); }

// After
private commands = signal<SidebarActions>(SidebarActions.HIDE_MARKDOWN);
readonly currentCommand = this.commands.asReadonly();
getCommands() { return this.currentCommand; }
triggerCmd(action: SidebarActions) { this.commands.set(action); }
```

### SideNavService

```typescript
// Before
visible$: BehaviorSubject<boolean> = new BehaviorSubject(true);
position$: BehaviorSubject<MatDrawerMode> = new BehaviorSubject('side');
toggleMenuVisibility() { let status = !this.visible$.getValue(); this.visible$.next(status); }

// After
private visible = signal(true);
private position = signal<MatDrawerMode>('side');
readonly sideNavVisible = this.visible.asReadonly();
readonly sideNavPosition = this.position.asReadonly();
toggleMenuVisibility() { this.visible.update(v => !v); }
```

## Consumer Changes

### DemoContainerComponent

- `workbenchLeftMargin`: Observable pipe → `computed()`
- `showMdEditor`: Observable pipe → `computed()`
- Template: `| async` → direct signal calls `()` for `sidenavVisible`, `sidenavMode`, `workbenchLeftMargin`, `showMdEditor`
- Kept `AsyncPipe` for `demos` and `header` (still Observables from HTTP/Router)

### No Changes Required

- `NavbarComponent` — only uses `getTopItems()` (HTTP Observable)
- `SidePanelComponent` — only calls imperative methods
- `LoadingInterceptor` — `setLoading()` API unchanged

## Key Patterns

| Pattern           | Before                       | After                 |
| ----------------- | ---------------------------- | --------------------- |
| State declaration | `new BehaviorSubject(value)` | `signal(value)`       |
| Expose read-only  | `.asObservable()`            | `.asReadonly()`       |
| Update state      | `.next(value)`               | `.set(value)`         |
| Toggle state      | `.getValue()` + `.next()`    | `.update(v => !v)`    |
| Derived state     | `.pipe(map(...))`            | `computed(() => ...)` |
| Template binding  | `value \| async`             | `value()`             |

## Test Migration

Tests changed from async Observable reads to synchronous signal reads:

```typescript
// Before
const theme = await firstValueFrom(service.getTheme());
expect(theme).toBe('default');

// After
expect(service.getTheme()()).toBe('default');
```
