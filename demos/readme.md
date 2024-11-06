# Advanced Angular Development

This is a workshop for experienced Angular developers who want to deepen their knowledge and skills in Angular development. It consists of 10 modules each covering different advanced topics in Angular development. The workshop is designed to be hands-on and interactive, with a mix of lectures, demos, and exercises.

## Modules

### Standalone Components: Concepts & Migration

- Standalone Components vs Modules
- Creating Standalone Components and Converting existing Components
- Understanding the Angular Bootstrapping Process
- app.config.ts & app.routes.ts
- Registering Providers in app.config.ts
- Migration an existing Project to Standalone Components

### Components & Forms Deep Dive

- Using & Migrating to Control Flow Syntax
- Deferred Loading
- Standalone Directives & Directives Composition Api
- Content Projection 
- HostBinding & HostListener
- Reactive Forms (FormGroup, Form Builder, FormControl, FormArray)
- Typed Forms Nullability, NonNullableFormBuilder, GetRawValue
- Partial Values, Optional Controls, Dynamic Groups and FormRecord
- Classic Form Events vs Unified Form Events
- Cascading Form Controls
- Implementing Custom Controls using ControlValueAccessor
- Typed Forms Validation & Custom Validators
- Handling FormErrors & ErrorStateMatcher

### Mastering Reactive Programming using RxJS

- Introduction to RxJS
- Observables, Observers & Use Cases
- Imperative vs Declarative Reactivity
- Data- vs Action-Streams
- Mouse & DOM Events as Observables
- Subject Types & Stateful Services
- Unsubscribing DestroyRef & takeUntilDestroyed
- Base Operators: Mapping, Filtering, Merging, 
- Understanding Marble Diagrams & Debugging Observables
- Marble-testing RxJS
- Combination & Transformation Operators
- Retry & Error Handling Strategies
- Implementing & Testing Custom Observable Operators

### Mastering Reactivity using Signals

- Introduction to Signals (WritableSignal, Computed, Effects)
- Signals vs Observables
- Signals & Observables Interoperability
- Nesting Components using Signals, input, output & model
- View Queries: viewChild, -Children, contentChild, -Children
- Creating View Models using Deep Signals
- Communication between Components using Event Bus Pattern
- Zoneless Change Detection using Signals

### Advanced State Management using NgRx

- Overview State Management Patterns
- NgRx Classic vs Signal Store
- Introduction to the Classic NgRx & Redux Pattern
- Implementing NgRx Store, Reducers & Selectors using createFeature
- Actions & createActionGroup
- Effects, Facades, @ngrx/entity & @ngrx/data
- Creating a Signals Store using @ngrx/signals
- Side Effects using rxMethod
- Signals Store, Entity & Custom Data Services
- Implementing and using Custom Store Features

### Advanced Routing and App Initialization

- Dependency Injection in Depth: Resolution modifiers and Dependency providers
- Using Constructor vs inject for DI
- APP_INITIALIZER, Injection & forwardRef
- Implementing Global Error Handling and Retry-Patterns
- Lazy Loading & Dynamic Components
- Using Preloading Strategies
- Binding Router-Params to Component Inputs
- Preloading Component Data using Functional Resolvers
- Route Redirect Functions
- Functional Route Guards & Interceptors
- View Transition Api
- Auxiliary Routes: Common use cases
- Router Animations & Anchor Scrolling
- Introduction to Visual Feedback (Loading-, Saving-, ...-Indicator)

### Advanced Testing with Jasmine, Jest, Cypress and NgRx

- Introduction Angular Testing Tools (Jasmine, Karma, Jest & Cypress)
- Testing Classes, Pipes, Directives
- Testing Services using HttpClientTestingModule & HttpTestingController
- Mocking vs Spies
- Testing Component Interaction (Read, Write, Emit, Inputs)
- Complex Forms Testing
- Testing Observables & Signals
- Material Testing using Component Harnesses
- Async Component Testing (done, fakeAsync, waitForAsync)
- Components Marble Testing
- Testing NgRx: Mock Store, Mock Selectors, Reducers, Effects, Facades
- Using Jest for Unit Testing (Setup, Changes in spec, Snapshot Tests)
- Introduction to End-2-End Testing using Cypress
- Cypress Component Tests

### Reusability with Libraries, Nx & Angular Elements

- Angular Building Blocks: Workspace, Apps, Libraries
- Reusable Artifacts using Angular Libraries
- Introduction to Nx Workspaces
- Creating a reusable AI Chat Component using Angular Elements

### Real Time, Micro-Frontends, Progressive Web Apps

- Introduction to Micro-Frontends 
- Real Time connected using Cloud Events or Large Language Models Responses
- Introduction to Progressive Web Apps
- Understanding and Configuring Service Workers & Manifests
- Installing & Updating Progressive Web Apps

# Optimizing Applications

- Using Chrome Dev Tools & Lighthouse for Performance Optimization
- Understanding & Using Page Traces & Web Vitals
- Analyzing and Optimizing Bundles & Components
- Optimizing Images using NgOptimizedImage 
- Data-Loading Strategies, Virtual- & Infinite Scrolling, 
- Understanding, Profiling & Optimizing Angular Change Detection
- Understanding & Optimizing Angular Change Detection
- Introduction to Server Side Rendering (SSR) and Non-destructive hydration
- Accessibility A11y: Best Practices & Linting
- Using Linting and Autoformat with Prettier
- Configuration Management & Containers