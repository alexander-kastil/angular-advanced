# Migration Progress Log

## Project

`demos/01-components/02-component-forms/ng-components-forms`

## Steps

### 1. Exploration

Identified 4 services using `BehaviorSubject` in `src/app/shared`:

| Service          | File                                     | BehaviorSubject(s)                                                                |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| ThemeService     | `shared/theme/theme.service.ts`          | `currTheme: BehaviorSubject<string>`                                              |
| LoadingService   | `shared/loading/loading.service.ts`      | `isLoading: BehaviorSubject<boolean>`                                             |
| SidePanelService | `shared/side-panel/sidepanel.service.ts` | `commands: BehaviorSubject<SidebarActions>`                                       |
| SideNavService   | `shared/sidenav/sidenav.service.ts`      | `visible$: BehaviorSubject<boolean>`, `position$: BehaviorSubject<MatDrawerMode>` |

Consumers: `DemoContainerComponent`, `NavbarComponent`, `SidePanelComponent`, `LoadingInterceptor`

### 2. Vitest Setup

- Removed Jasmine/Karma packages and config
- Switched to native `@angular/build:unit-test` builder (Angular 21)
- Updated `tsconfig.spec.json` with `vitest/globals` types and `esnext.disposable` lib
- Verified with `ng test --no-watch`

### 3. Pre-Migration Tests

Wrote unit tests for all 4 services using `firstValueFrom()` against existing Observable API:

- `theme.service.spec.ts` — 4 tests
- `loading.service.spec.ts` — 4 tests
- `sidepanel.service.spec.ts` — 4 tests
- `sidenav.service.spec.ts` — 7 tests

Result: 6 files, 21 tests passing

### 4. Signal Migration

Replaced `BehaviorSubject` with `signal()` in all 4 services:

- `ThemeService` → `signal('default')`, exposed via `asReadonly()`
- `LoadingService` → `signal(false)`, exposed via `asReadonly()`
- `SidePanelService` → `signal<SidebarActions>(HIDE_MARKDOWN)`, exposed via `asReadonly()`
- `SideNavService` → `signal(true)` for visible, `signal<MatDrawerMode>('side')` for position, `update()` for toggle

Removed `adjustSidenavToScreen()` (unused method).

### 5. Updated Consumers

- `DemoContainerComponent`: Replaced `workbenchLeftMargin` observable pipe with `computed()`, replaced `showMdEditor` observable pipe with `computed()`, updated template bindings from `| async` to signal calls `()`
- `NavbarComponent`: No changes needed — `menuItems` is HTTP Observable (kept `AsyncPipe`)
- `SidePanelComponent`: No changes needed — uses imperative method calls
- `LoadingInterceptor`: No changes needed — `setLoading()` API unchanged

### 6. Updated Tests

Changed all service tests from `firstValueFrom(service.getX())` to direct signal reads `service.getX()()`.

### 7. Verification

- All 21 tests pass
- Build succeeds
- App serves and runs on `http://localhost:4200/`
