# Further Optimizations - ng-signals Application

## Overview
Following the Angular 21 update, this document outlines recommended optimizations to enhance performance, maintainability, and modern Angular practices.

## 1. Change Detection Strategy Enhancement

### Add OnPush to All Components
Replace default change detection with OnPush across the entire application. This works synergistically with zoneless change detection.

**Impact:** 
- Reduced change detection cycles
- Better performance on large component trees
- Explicit data flow control

**Recommendation Priority:** CRITICAL

## 2. Signal-Based State Management

### Current State
- App uses NgRx for state management
- Heavy signal usage in demos
- Good signal-based derived state patterns

### Optimizations

#### 2.1 Convert Observable-Based Services to Signals
Services like `SkillsService`, `CustomersService` should expose signals:

```typescript
// Before
skillsStream$: Observable<Skill[]>;

// After
skills = toSignal(this.api.getSkills());
filteredSkills = computed(() => 
  this.skills().filter(skill => skill.category === this.selectedCategory())
);
```

#### 2.2 Leverage Computed Signals
Replace ngRx selectors with computed signals where possible for derived state:

```typescript
visibleDemos = computed(() => 
  this.allDemos().filter(demo => 
    demo.category === this.selectedCategory() && 
    demo.title.toLowerCase().includes(this.searchTerm())
  )
);
```

**Impact:**
- Simpler dependency tracking
- No subscription management needed
- Better TypeScript inference
- Cleaner component code

## 3. Template Syntax Modernization

### 3.1 Control Flow Syntax
Review and standardize on new control flow syntax:

```typescript
// Instead of *ngIf, *ngFor, *ngSwitch
@if (isLoading()) {
  <app-loading-spinner />
} @else {
  <div>{{ content() }}</div>
}

@for (item of items(); track item.id) {
  <app-item [data]="item" />
}
```

**Current Status:** Unknown - needs audit
**Impact:** Modern, cleaner templates

### 3.2 Remove ngClass/ngStyle
Replace with direct bindings:

```typescript
// Instead of [ngClass]="{ active: isActive }"
[class.active]="isActive()"

// Instead of [ngStyle]="{ color: textColor }"
[style.color]="textColor()"
```

**Impact:** Better DevTools performance, cleaner markup

## 4. Form Handling Improvements

### 4.1 Leverage Signal Forms API (New in Angular 21)
Currently using reactive forms? Signal Forms provide automatic two-way binding:

```typescript
form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl(''),
  skills: new FormArray([])
});

// With Signals (v21+)
form = formGroup({
  name: [''],
  email: [''],
  skills: formArray([])
});
```

**Impact:** Simplified form state management, better reactivity

## 5. Bundle Size Optimization

### 5.1 Analyze Current Bundle
```bash
ng build --configuration production --stats-json
webpack-bundle-analyzer dist/ng-signals/stats.json
```

### 5.2 Key Areas to Review
- **Material Dependencies**: Review used vs. unused Material modules
- **RxJS Operators**: Audit operator usage, tree-shake unused ones
- **Theme Customization**: Consider minimalist theme if possible
- **Markdown Parsing**: `ngx-markdown` + `marked` could be optimized

### 5.3 Lazy Loading
Verify all feature routes are properly lazy-loaded:
- Skills route
- Customers route  
- Demo samples

## 6. Image Optimization

### 6.1 Use NgOptimizedImage
All images should use `NgOptimizedImage` directive:

```typescript
// Instead of <img src="logo.png">
<img ngSrc="logo.png" width="200" height="50" priority />
```

**Impact:** Automatic lazy loading, responsive image handling, LSCP optimization

## 7. Performance Monitoring

### 7.1 Add Core Web Vitals Monitoring
Integrate Application Insights or similar APM tool:

```typescript
import { initializeApp } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    connectionString: 'YOUR_CONNECTION_STRING'
  }
});
```

### 7.2 Custom Metrics
Track custom metrics for demos:
- Demo load time
- Interaction latency
- Signal update frequency

**Impact:** Data-driven optimization decisions

## 8. Accessibility (A11y) Enhancements

### 8.1 Audit with axe DevTools
Run automated accessibility checks on all routes:
- Home page
- /demos routes
- Demo detail pages
- Customers page
- Skills management

### 8.2 ARIA Attributes
Ensure proper ARIA labels for:
- Navigation components
- Modal dialogs
- Dynamic content updates
- Form controls

### 8.3 Keyboard Navigation
Verify all interactive elements are keyboard accessible

## 9. Dependencies & Security

### 9.1 Audit Dependencies
```bash
npm audit
npm list | grep vulnerable
```

### 9.2 Update Outdated Packages
- `baseline-browser-mapping`: Update or remove
- Review `zone.js` version compatibility
- Check Material version compatibility

## 10. Testing Coverage

### 10.1 Unit Test Modernization
- Ensure tests use OnPush detection strategy
- Update tests for signal-based components
- Remove Observable mock expectations

### 10.2 E2E Testing
- Add performance benchmarks
- Test all demo routes
- Test state synchronization

## Priority Matrix

| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| OnPush Change Detection | CRITICAL | Medium | High |
| Signal-Based Services | HIGH | Medium | High |
| Control Flow Templates | HIGH | Low | Medium |
| Signal Forms API | MEDIUM | High | High |
| Bundle Analysis | MEDIUM | Low | Medium |
| A11y Audit | MEDIUM | Low | Medium |
| ngOptimizedImage | LOW | Low | Low |

## Quick Wins (1-2 hours)
1. ✓ Add OnPush to AppComponent
2. ✓ Add OnPush to navbar/sidenav
3. ✓ Replace [ngClass] with [class] bindings
4. ✓ Replace [ngStyle] with [style] bindings

## Medium Effort (2-4 hours)
1. Add OnPush to all remaining components
2. Audit and optimize ngx-markdown usage
3. Add core web vitals monitoring

## Strategic Improvements (1-2 days)
1. Convert services to signal-based
2. Implement Signal Forms API
3. Comprehensive performance monitoring

## Estimated Performance Gains
- **Change Detection:** 30-40% reduction in CD cycles
- **Bundle Size:** 5-10% reduction with Material optimization
- **First Paint:** 10-15% improvement with ngOptimizedImage + lazy loading
- **Interaction Latency:** 20-30% improvement with proper signal usage

## Success Metrics
- ✓ Lighthouse score > 95
- ✓ All CWV metrics "Good"
- ✓ A11y audit passes with 0 errors
- ✓ <2s initial load time
- ✓ <100ms interaction latency
