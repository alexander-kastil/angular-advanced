# Angular 21 Migration Best Practices

## Migration Summary: standalone-skills App

Successfully migrated from Angular 20 to Angular 21 with zoneless and OnPush optimizations.

Use the Angular MCP for best practices in your migration.

---

## Step 1: Use Angular CLI for Updates

**Always use Angular CLI for version updates:**

```bash
ng update @angular/core@21 @angular/cli@21
```

If the project uses other Angular packages, include them as well:

```bash
ng update @angular/material@21 @angular/cdk
```

this is a monorepo. you might use `ng update @angular/*@21 ... --allow-dirty`

**Why:**

- Automatic migrations run (control flow, bootstrap options, etc.)
- Package.json automatically updated
- TypeScript config modernized (`moduleResolution: bundler`)
- Handles peer dependencies

**Never manually edit package.json for Angular versions!**

---

## Step 2: Package Management Rules

**Use npm for all package operations:**

```bash
# Install packages
npm install package-name

# Remove packages
npm uninstall package-name

# Update dependencies
npm update
```

**Never manually edit package.json dependencies!**

---

## Step 3: Enable Zoneless Change Detection

**Angular 21 uses `provideZonelessChangeDetection()` (no longer experimental)**

### Update main.ts:

```typescript
import { provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideZonelessChangeDetection(), ...appConfig.providers],
}).catch((err) => console.error(err));
```

### Remove zone.js:

```bash
npm uninstall zone.js
```

### Update angular.json:

```json
{
  "polyfills": [] // Remove zone.js from polyfills array
}
```

### Also remove from test configuration:

```json
"test": {
  "options": {
    "polyfills": []  // Remove zone.js and zone.js/testing
  }
}
```

---

## Step 4: Add OnPush Change Detection

**Apply `ChangeDetectionStrategy.OnPush` to ALL components:**

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush, // Add this
})
export class ExampleComponent {
  // ...
}
```

**Benefits:**

- Components only check when:
  - Inputs change
  - Events fire
  - Signals update
  - Observables emit (with async pipe)
- Massive performance improvement
- Required for zoneless applications

---

## Step 5: Optimize Performance

### 5.1 Use Proper TrackBy Functions

**Bad (tracking by object reference):**

```html
@for (item of items(); track item) {
<!-- ... -->
}
```

**Good (tracking by unique id):**

```typescript
trackById(index: number, item: Item): number {
  return item.id;
}
```

```html
@for (item of items(); track trackById($index, item)) {
<!-- ... -->
}
```

### 5.2 Enable Route Preloading

```typescript
import { provideRouter, withPreloading, PreloadAllModules } from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // ...
  ],
};
```

**Benefits:**

- Lazy routes load in background after initial load
- Instant navigation for users
- Better perceived performance

### 5.3 Use Signals with toSignal()

**Convert Observables to Signals for better change detection:**

```typescript
import { toSignal } from "@angular/core/rxjs-interop";

export class SkillsComponent {
  service = inject(SkillsService);
  skills = toSignal(this.service.getSkills()); // Signal from Observable
}
```

**In template:**

```html
@for (skill of skills(); track trackById($index, skill)) {
<!-- Signals work perfectly with OnPush -->
}
```

---

## Step 6: Verify Build

**Always verify after migration:**

```bash
ng build
```

**Check for:**

- No compilation errors
- Reasonable bundle size
- All optimizations applied

---

## Results: standalone-skills App

### Before Migration (Angular 20):

- ✅ Standalone components
- ❌ Zone.js dependency (~34 KB)
- ❌ Default change detection (inefficient)
- ❌ No route preloading

### After Migration (Angular 21):

- ✅ Angular 21 latest
- ✅ Zoneless (`provideZonelessChangeDetection()`)
- ✅ OnPush on all components
- ✅ Optimized trackBy functions
- ✅ Route preloading enabled
- ✅ Bundle: **~62 KB compressed**
- ✅ No zone.js dependency
- ✅ Better performance

---

## Key Takeaways

1. **Use Angular CLI** for all Angular updates and migrations
2. **Use npm** for all package management
3. **Zoneless is production-ready** in Angular 21 (no longer experimental)
4. **OnPush is essential** for zoneless apps
5. **Signals work perfectly** with OnPush and zoneless
6. **Always use trackBy** with unique identifiers in @for loops
7. **Preload lazy routes** for better UX
8. **Verify builds** after every major change

---

## Common Pitfalls to Avoid

❌ **DON'T** manually edit package.json for Angular versions
❌ **DON'T** use `provideExperimentalZonelessChangeDetection()` in v21+ (it's just `provideZonelessChangeDetection()` now)
❌ **DON'T** forget to remove zone.js from test configuration
❌ **DON'T** track by object reference in @for loops
❌ **DON'T** forget OnPush on any component in a zoneless app

✅ **DO** use `ng update` for migrations
✅ **DO** use `npm` for package operations
✅ **DO** add OnPush to all components
✅ **DO** use signals where possible
✅ **DO** verify builds after changes

---

## Resources

- [Angular.dev MCP Documentation](https://angular.dev/ai/mcp)
- [Angular 21 Release Notes](https://angular.dev/events/v21)
- [Zoneless Change Detection Guide](https://angular.dev/guide/experimental/zoneless)
- [OnPush Change Detection](https://angular.dev/best-practices/runtime-performance)
