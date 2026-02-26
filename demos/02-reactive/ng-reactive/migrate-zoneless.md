# Migration to Zoneless Change Detection

## Executive Summary

The ng-reactive application is a **strong candidate for zoneless change detection migration**. The analysis shows no direct NgZone usage, proper component architecture, and appropriate use of RxJS observables. This document outlines the migration strategy and implementation steps.

## Current State Analysis

### ✅ Compatibility Assessment

| Aspect                        | Status              | Details                                                        |
| ----------------------------- | ------------------- | -------------------------------------------------------------- |
| **NgZone Usage**              | ✅ None Found       | No `inject(NgZone)` or `NgZone` direct usage detected          |
| **Change Detection Strategy** | ✅ Ready            | Application is already using zone-based detection              |
| **Component Architecture**    | ✅ Standalone       | All components are standalone (Angular v20+)                   |
| **State Management**          | ✅ Observable-Based | Uses RxJS for reactive state, compatible with zoneless         |
| **Event Handling**            | ✅ Standard         | No custom event patching or setTimeout manipulation            |
| **Material Components**       | ✅ Compatible       | Angular Material v21.2.0 supports zoneless                     |
| **Polyfills**                 | ✅ Removed           | zone.js removed from polyfills, zoneless CD enabled            |

### Potential Considerations

1. **ngx-markdown v20.1.0** - Should work fine; it's a simple markdown renderer
2. **axios** - HTTP library not directly affected by zoneless change detection
3. **Async Operations** - Application uses `async` pipe and observables correctly
4. **Third-party Libraries** - No custom event handlers or setTimeout patterns detected

## Migration Strategy

### Phase 1: Preparation (No Code Changes)

- Verify no blocking patterns in codebase ✅ Completed
- Review Angular documentation for zoneless change detection
- Plan testing approach

### Phase 2: Configuration Changes

1. Update `main.ts` - Replace `provideZoneChangeDetection()` with `provideExperimentalZonelessChangeDetection()`
2. Update `angular.json` - Remove `zone.js` from polyfills
3. Component review - Verify all components use `ChangeDetectionStrategy.OnPush` (recommended)

### Phase 3: Testing & Validation

1. Run development server: `ng serve`
2. Check browser console for errors
3. Test all demo routes
4. Verify async operations work correctly
5. Run unit tests: `ng test`
6. Run production build: `ng build --configuration production`

### Phase 4: Monitoring & Refinement

- Monitor performance metrics (FCP, LCP)
- Watch for runtime zone-related errors
- Validate change detection cycles

## Implementation Steps

### Step 1: Update main.ts

**File:** `src/main.ts`

**Current:**

```typescript
import { provideZoneChangeDetection } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, { ...appConfig, providers: [provideZoneChangeDetection(), ...appConfig.providers] }).catch((err) => console.error(err));
```

**Updated:**

```typescript
import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, { ...appConfig, providers: [provideExperimentalZonelessChangeDetection(), ...appConfig.providers] }).catch((err) => console.error(err));
```

**Why:** This enables zoneless change detection based on signal changes and explicit async operations rather than zone.js patching.

### Step 2: Update angular.json

**File:** `angular.json`

**Current (polyfills section):**

```json
"polyfills": [
  "zone.js"
]
```

**Updated (remove polyfills entirely or use empty array):**

```json
"polyfills": []
```

OR remove the `polyfills` key entirely if not needed for other purposes.

**Why:** zone.js is no longer needed with zoneless change detection. This saves ~30KB from the bundle.

### Step 3: Component OnPush Verification

Audit all components and ensure they use `ChangeDetectionStrategy.OnPush`:

**Command to check:**

```bash
grep -r "ChangeDetectionStrategy.OnPush" src/app
```

**Expected:** All components should have this flag. If any are missing:

**Before:**

```typescript
@Component({
  selector: 'app-demo',
  template: `...`,
  imports: [...]
})
```

**After:**

```typescript
@Component({
  selector: 'app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
  imports: [...]
})
```

**Note:** In zoneless applications, components without `OnPush` may experience slower change detection.

## Testing Checklist

### Browser Testing

- [ ] Home page loads without errors
- [ ] Navigation to `/demos` works
- [ ] Demo menu displays all items
- [ ] Demo examples render correctly
- [ ] Code snippets display properly
- [ ] No "zone is undefined" errors in console

### Functionality Testing

- [ ] Observable subscriptions work
- [ ] HTTP requests (via httpClient) work
- [ ] Form interactions respond immediately
- [ ] Route navigation is smooth
- [ ] Event handlers fire correctly

### Performance Testing

- [ ] Initial bundle size verification
- [ ] Development server startup time
- [ ] Production build completes successfully
- [ ] Change detection cycles are efficient (use DevTools)

### Unit Testing

```bash
ng test
```

- [ ] All tests pass
- [ ] No timing-related test failures
- [ ] No zone-related error messages

### Production Build

```bash
ng build --configuration production
```

- [ ] Build completes without errors
- [ ] No warnings about zone.js
- [ ] Bundle size is smaller than before

## Known Limitations & Workarounds

### Observable with setTimeout

**Issue:** RxJS `interval()` or manual `setTimeout()` in observables may not trigger change detection.

**Solution:** Use `toSignal()` or ensure the observable is properly connected to the template via the `async` pipe.

**Code Example:**

```typescript
// Works - using async pipe
protected data$ = this.service.getData();

// In template:
{{ data$ | async }}

// Alternative - convert to signal
protected data = toSignal(this.service.getData());

// In template:
{{ data() }}
```

### Third-party Library Events

**Issue:** Some third-party libraries may use zone.js internally.

**Solution:** Monitor for errors; most modern libraries have zoneless support.

**Current Assessment:** No blocking libraries detected in package.json.

## Rollback Plan

If issues arise, reverting is straightforward:

```typescript
// Revert main.ts
import { provideZoneChangeDetection } from "@angular/core";
bootstrapApplication(AppComponent, {...appConfig, providers: [provideZoneChangeDetection(), ...appConfig.providers]})

// Restore angular.json
"polyfills": ["zone.js"]

// Reinstall
npm install
```

## Performance Impact Expectations

### Bundle Size

- **Reduction:** ~30-40KB (zone.js removal)
- **Current bundle:** ~2.6MB (dev), will be smaller without zone.js

### Change Detection Efficiency

- **Reduced cycles:** Fewer global change detection cycles
- **Faster initial load:** No zone.js initialization
- **Memory usage:** Slightly lower due to zone.js overhead removal

### Runtime Performance

- **Input events:** Handled without zone patching
- **Observable changes:** Explicit signals trigger updates
- **CPU usage:** Reduced due to fewer change detection cycles

## Migration Timeline

**Estimated effort:** 30 minutes to 1 hour

1. **File edits:** 5-10 minutes (main.ts + angular.json)
2. **Component review:** 10-15 minutes
3. **Testing:** 10-20 minutes
4. **Build verification:** 5-10 minutes

## Next Steps

To implement this migration:

1. Backup current working branch
2. Apply Step 1 changes (main.ts)
3. Apply Step 2 changes (angular.json)
4. Run `npm install` (zone.js will be removed from node_modules)
5. Start dev server: `ng serve`
6. Test thoroughly
7. Run `ng test`
8. Commit changes with migration notes

## References

- [Angular Zoneless Change Detection](https://angular.dev/guide/change-detection#experimental-zoneless-change-detection)
- [Angular v21 Release Notes](https://github.com/angular/angular/releases)
- [Zone.js GitHub](https://github.com/angular/zone.js)

## Conclusion

**Recommendation: Proceed with zoneless migration**

This application is well-suited for zoneless change detection:

- ✅ No direct NgZone dependencies
- ✅ Proper component architecture
- ✅ Observable-based state management
- ✅ No custom event patching
- ✅ Material components fully compatible

The migration will provide performance benefits without breaking changes.
