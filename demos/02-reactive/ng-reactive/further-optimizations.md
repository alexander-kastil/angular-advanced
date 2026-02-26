# Further Optimization Recommendations

This document outlines additional optimizations that can be applied to the ng-reactive demonstration application after upgrading to Angular v21.

## 1. Gradual Migration to Signals

**Current State:** The application heavily uses RxJS observables for reactive programming, which is appropriate for a RxJS teaching application.

**Recommendation:** Consider gradually introducing signals for local component state while keeping observables for complex data flows. This is particularly relevant for:

- Component state (loading, error states)
- UI interaction state (form inputs, filter selections)
- Derived computed values

**Implementation Path:**

- Use `toSignal()` to bridge observables where it makes sense
- Introduce `linkedSignal()` for state derived from route parameters
- Use `computed()` for derived state calculations

## 2. OnPush Change Detection Strategy

**Current State:** Some components may be using default change detection.

**Recommendation:** Audit all components and ensure they use `ChangeDetectionStrategy.OnPush`:

- Review `src/app/demos/**/*.component.ts` for components without explicit change detection strategy
- Apply `ChangeDetectionStrategy.OnPush` to all components
- This reduces change detection cycles and improves performance

**Example:**

```typescript
@Component({
  selector: 'app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

## 3. Zoneless Change Detection

**Current State:** Application uses `provideZoneChangeDetection()` with zone.js still in polyfills.

**Recommendation:** Evaluate migration to zoneless change detection for improved performance:

- Remove `zone.js` from polyfills array in `angular.json`
- Replace `provideZoneChangeDetection()` with `provideExperimentalZonelessChangeDetection()` in `main.ts`
- Audit all components and services for compatibility (no `NgZone` usage)
- This eliminates zone.js overhead and improves initial load time

**Note:** This is an experimental feature in Angular 21 and should be tested thoroughly before enabling globally.

## 4. Improve Template Performance with trackBy

**Current State:** Demo components may use `*ngFor` or `@for` without trackBy functions.

**Recommendation:**

- Audit all `@for` loops in demo components
- Implement trackBy functions for list items to prevent unnecessary DOM reflow
- Use `track` function parameter in the new `@for` block syntax

**Example:**

```typescript
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}
```

## 6. Use Image Optimization

**Current State:** No explicit image optimization noticed.

**Recommendation:**

- Replace all static image usages with `NgOptimizedImage` where applicable
- Implement responsive images with srcset if using multiple resolutions
- Lazy load images that are not immediately visible

## 8. Refactor Observable Chains with Modern Operators

**Current State:** Application uses traditional RxJS patterns appropriate for teaching.

**Recommendation:**

- Introduce higher-order operators (switchMap, mergeMap, concatMap) for advanced demos
- Demonstrate composition patterns over nested subscriptions
- Use `shareReplay()` for frequently accessed data streams

