# Advanced Angular Development

This is a workshop for experienced Angular developers who want to deepen their knowledge and skills in Angular development. It consists of 10 modules each covering different advanced topics in Angular development. The workshop is designed to be hands-on and interactive, with a mix of lectures, demos, and exercises. It allows participants to deepen their Angular skills for Classic Angular Development but also teaches the updates introduced by the Angular Renaissance Initiative like using Standalone Components, functional Implementations, Signals, and NgRx SignalStore.

Standalone Components - Concepts & Migration: Understand the differences between standalone components and modules, delve into Angular's bootstrapping process, and learn how to migrate an existing project to use standalone components.

Components & Forms Deep Dive: Explore advanced component and form techniques, including control flow syntax, deferred loading, content projection, cascading reactive forms, and creating custom controls with enhanced validation and error handling.

Mastering Reactive Programming using RxJS: Master RxJS concepts like observables, operators, and error handling strategies, along with practical debugging and testing techniques for implementing custom observable operators.

Mastering Reactivity using Signals: Learn about signals and their interoperability with observables, data retrieval methods, and effective communication between components using advanced signal techniques and the Event Bus pattern.

State Management using NgRx Classic & NgRx SignalStore: Discover state management patterns, implement both NgRx Classic and SignalStore, manage side effects, and create custom store features while tracking state changes efficiently.

Advanced Routing and App Initialization: Gain deep insights into dependency injection, app initialization, global error handling, and advanced routing techniques including view transitions, auxiliary routes, and router animations.

Advanced Testing with Jasmine, Jest, Cypress and NgRx: Comprehensively test Angular applications using tools like Jasmine, Jest, and Cypress, covering unit tests, complex form testing, state management testing, and end-to-end testing.

Reusability with Libraries, Nx & Angular Elements: Create reusable Angular artifacts using libraries and Nx workspaces, and develop reusable components like an AI chat using Angular Elements.

Real Time Micro-Frontends & Progressive Web Apps: Understand micro-frontends and progressive web apps, focusing on real-time connected micro-frontends, HTML5 APIs, service workers, and PWA installation and updates.

Server Side Rendering (SSR): Get introduced to SSR, including build-time pre-rendering, optimizing components for server-side, hybrid rendering, and incremental hydration for improved performance.

Optimizing Applications: Use tools like Chrome Dev Tools and Lighthouse to optimize application performance, analyze bundles, improve change detection, and ensure accessibility and configuration management best practices.

## Modules

### Standalone Components: Concepts & Migration

- Standalone Components vs Modules
- Understanding the Angular Bootstrapping Process
- Registering Providers in app.config.ts
- Routing and app.routes.ts
- Migrate an existing Project to Standalone Components

### Components & Forms Deep Dive

- Using & Migrating to Control Flow Syntax
- Deferred Loading & Selective Activation using @deferred
- Standalone Directives & Directives Composition Api
- Reusability with Content Projection 
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
- Unsubscribing DestroyRef & takeUntilDestroyed
- Imperative vs Declarative Reactivity
- Data- vs Action-Streams
- Mouse & DOM Events as Observables
- Subject Types & Stateful Services
- Base Operators: Mapping, Filtering, Merging, 
- Understanding Marble Diagrams & Debugging Observables
- Combination & Transformation Operators
- Retry & Error Handling Strategies
- Implementing & Testing Custom Observable Operators

### Mastering Reactivity using Signals

- Introduction to Signals (WritableSignal, Computed, Effects)
- Signals vs Observables
- Signals & Observables Interoperability
- Deep Signals & Linked Signals
- Data Retrieval using resource() and rxResource()
- Nesting Components using Signals, input, output & model
- View Queries: viewChild, -Children, contentChild, -Children
- Creating View Models using Deep Signals
- Communication between Components using Event Bus Pattern
- ngAfterSignalUpdate Lifecycle Hook

### State Management using NgRx Classic & NgRx SignalStore

- Overview State Management Patterns
- NgRx Classic vs Signal Store
- Introduction to the Classic NgRx & Redux Pattern
- Implementing NgRx Store, Reducers & Selectors using createFeature
- Actions & createActionGroup
- Effects, Facades, @ngrx/entity & @ngrx/data
- Creating a Signals Store using @ngrx/signals
- NgRx and Signals Interoperability
- Side Effects using rxMethod
- Signals Store, Entity & Custom Data Services
- Implementing and using Custom Store Features
- Tracking State changes

### Advanced Routing and App Initialization

- Dependency Injection in Depth: Resolution modifiers and Dependency providers
- Using Constructor vs inject for DI
- App initialization & Interceptors
- Global Error Handling & Http-Error Interceptor with Retry-Patterns
- Using Preloading Strategies & Functional Resolvers
- Functional Route Guards
- Route Redirect Functions
- Binding Router-Params to Component Inputs & routerOutletData 
- View Transition Api
- Auxiliary Routes: Common use cases
- Router Animations & Anchor Scrolling

### Advanced Testing with Jasmine, Jest, Cypress and NgRx

- Introduction Angular Testing Tools (Jasmine, Karma, Jest & Cypress)
- Testing Classes, Pipes, Directives
- Testing Services using HttpClientTestingModule & HttpTestingController
- Testing Component Interaction (Read, Write, Emit, Inputs)
- Complex Forms Testing & Deferrable Views
- Testing Observables & Signals
- Material Testing using Component Harnesses
- Async Component Testing (done, fakeAsync, waitForAsync)
- Marble-testing RxJS
- Testing NgRx Classic: Mock Store, Mock Selectors, Reducers, Effects, Facades
- Testing Signal Store & Custom Features
- Using Jest for Unit Testing (Setup, Changes in spec, Snapshot Tests)
- Introduction to End-2-End Testing using Cypress

### Reusability with Libraries, Nx & Angular Elements

- Angular Building Blocks: Workspace, Apps, Libraries
- Reusable Artifacts using Angular Libraries
- Introduction to Nx Workspaces
- Creating a reusable AI Chat Component using Angular Elements

### Real Time Micro-Frontends & Progressive Web Apps

- Introduction to Micro-Frontends 
- Real Time connected Micro-Frontend processing Cloud Events
- Introduction to Progressive Web Apps
- HTML 5 APIs
- Understanding and Configuring Service Workers & Manifests
- Installing & Updating Progressive Web Apps

## Server Side Rendering (SSR)

- Introduction to Server Side Rendering (SSR)
- Build-time pre-rerendering
- Optimize Components using Platform Specific Code
- Hybrid Rendering
- Introduction to Hydration & Incremental Hydration

# Optimizing Applications

- Using Chrome Dev Tools & Lighthouse for Performance Optimization
- Understanding & Using Page Traces & Web Vitals
- Analyzing and Optimizing Bundles & Components
- Build Optimizations using Angular CLI
- Optimizing Images using NgOptimizedImage 
- Data-Loading Strategies, Virtual- & Infinite Scrolling, 
- Understanding, Profiling & Optimizing Angular Change Detection
- Zoneless Change Detection
- Accessibility A11y: Best Practices & Linting
- Using Linting and Autoformat with Prettier
- Configuration Management & Containers