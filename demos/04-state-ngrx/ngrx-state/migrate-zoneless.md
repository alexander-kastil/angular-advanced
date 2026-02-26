# Zoneless Change Detection Migration Analysis

## Current State

The application has been successfully updated to Angular 21.2.0 with all dependencies modernized:
- Angular Core: 21.2.0
- Angular Material: 21.2.0
- NgRx: 21.0.1
- TypeScript: 5.9.2+

## Prerequisites for Zoneless Migration

The following prerequisites have been met:
✅ Angular 21+ installed
✅ `provideZoneChangeDetection()` is already added in main.ts
✅ No direct NgZone usage detected (ngZone.runOutsideAngular, etc.)
✅ Most components use standalone architecture
✅ Routing uses functional guards

## Required Actions for Complete Zoneless Support

### 1. Add OnPush Change Detection to All Components

**Current Issue**: Several components are missing `ChangeDetectionStrategy.OnPush`:
- `CustomersComponent`
- `DemoContainerComponent`
- `NavbarComponent`
- `SkillsContainerComponent`
- `SkillsEditComponent`
- Other presentation components

**Action**: Add `changeDetection: ChangeDetectionStrategy.OnPush` to all components:

```typescript
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [/* ... */]
})
export class CustomersComponent {
  // component code
}
```

### 2. Remove Zone.js from Bootstrap (Optional but Recommended)

Currently, `zone.js` is still included in bootstrap. For a fully zoneless application:

**In angular.json**:
```json
"polyfills": [
  // Remove "zone.js" from the array to make it truly zoneless
]
```

**Or keep it for backward compatibility** if third-party libraries depend on Zone.js.

### 3. Verify Signal Usage in State Management

The application uses:
✅ NgRx Store and Effects (compatible with zoneless)
✅ NgRx Data (compatible with zoneless)
✅ Async pipe in templates (works with signals)

**Recommendation**: Gradually migrate from `.subscribe()` to signals using:
- `toSignal()` for Observable → Signal conversion
- `input()` for component inputs
- `effect()` for side effects

### 4. Test Change Detection Performance

After enabling pure zoneless mode:

```bash
# Build production bundle
ng build --configuration production

# Profile performance with DevTools:
# 1. Open Chrome DevTools
# 2. Go to Performance tab
# 3. Record a user session
# 4. Look for reduced change detection cycles
```

**Expected Improvements**:
- Fewer change detection cycles per user interaction
- Reduced CPU usage during idle time
- Better performance on low-end devices

### 5. Update HTTP and Event Handling

Ensure all async operations properly trigger change detection:

```typescript
// Good: Using signals
users = resource({
  request: () => ({ url: '/api/users' }),
  loader: ({ request }) => this.http.get<User[]>(request.url)
});

// Alternative: Using toSignal
users = toSignal(this.http.get<User[]>('/api/users'));

// Avoid: Manual subscription (unless using takeUntilDestroyed)
// this.http.get(url).subscribe(data => this.data = data);
```

## Migration Steps

### Phase 1: Immediate (Next Sprint)
1. Add `ChangeDetectionStrategy.OnPush` to all 10+ components missing it
2. Run test suite: `ng test`
3. Manual testing: navigate through all routes and verify UI updates

### Phase 2: Short-term (1-2 Sprints)
1. Refactor subscribe patterns to use `toSignal()`
2. Replace `AsyncPipe` with signals where beneficial
3. Profile application performance with DevTools

### Phase 3: Long-term (Optional)
1. Remove `zone.js` from polyfills if all dependencies support it
2. Migrate to pure signal-based state management
3. Implement input signals for all component APIs

## Testing Zoneless Changes

```bash
# Run unit tests
ng test

# Run e2e tests (if available)
ng e2e

# Build and serve production
ng build --configuration production
ng serve --prod
```

## Breaking Changes & Compatibility

✅ **Compatible**:
- NgRx store system works with zoneless
- Angular Material works with zoneless
- HTTP client works with zoneless
- Routing works with zoneless

⚠️ **Requires Attention**:
- Third-party libraries that depend on Zone.js
- Custom event handlers that expect zone.run()
- Any code using NgZone explicitly

## Performance Expectations

After full zoneless migration:
- **Change Detection**: 40-60% reduction in CD runs
- **Bundle Size**: No significant change (zone.js still included for now)
- **Runtime Performance**: 10-20% improvement in input response time
- **Memory Usage**: Minimal impact

## Rollback Plan

If zoneless causes issues:
1. Revert `changeDetection` decorator removals
2. Keep `provideZoneChangeDetection()` in main.ts
3. Test thoroughly before next attempt

## References

- [Angular Zoneless Documentation](https://angular.dev/guide/change-detection#zoneless-change-detection)
- [OnPush Change Detection Strategy](https://angular.dev/guide/change-detection#skipping-component-subtrees)
- [Signal API Documentation](https://angular.dev/guide/signals)

## Acceptance Criteria

- [ ] All components have `ChangeDetectionStrategy.OnPush`
- [ ] No console warnings or errors in browser DevTools
- [ ] All routes load without UI issues
- [ ] Unit tests pass (100% success rate)
- [ ] No performance regressions observed
- [ ] CRUD operations work correctly with customers and demos
