# Advanced Angular Development

This is a workshop for experienced Angular developers who want to deepen their knowledge and skills in Angular development. It consists of 10 modules each covering different advanced topics in Angular development. The workshop is designed to be hands-on and interactive, with a mix of lectures, demos, and exercises.

Standalone Components: Concepts & Migration
This module introduces the concept of standalone components and contrasts them with traditional Angular modules. You’ll learn how to create and convert components, understand the Angular bootstrapping process, and manage providers in the new configuration files. The module also covers the use of app.config.ts and app.routes.ts for configuration and routing. Finally, it provides a comprehensive guide to migrating existing projects to use standalone components.

Components & Forms Deep Dive
Dive deep into Angular’s component and form capabilities. This module explores advanced topics such as control flow syntax, deferred loading, and standalone directives. You’ll master reactive forms, including typed forms, custom controls, and validation techniques, ensuring robust and dynamic form handling. Additionally, it covers content projection, HostBinding, and HostListener for more flexible component design. The module also addresses handling form errors and using the ErrorStateMatcher.

Mastering Reactive Programming using RxJS
Gain a comprehensive understanding of RxJS and its role in Angular applications. This module introduces observables, operators, and marble diagrams, helping you visualize and debug reactive streams. You’ll learn to handle reactivity declaratively, manage stateful services, and implement custom observable operators. The module also covers imperative vs. declarative reactivity and the use of data- and action-streams. Finally, it includes strategies for retry and error handling in reactive programming.

Mastering Reactivity using Signals
Explore the new Signals API in Angular, comparing it with observables and understanding their interoperability. This module covers component communication, zoneless change detection, and advanced view queries. You’ll learn to use signals for nesting components, handling inputs and outputs, and implementing the event bus pattern. The module also addresses the use of writable signals, computed signals, and effects for managing reactivity. Additionally, it covers the use of viewChild, viewChildren, contentChild, and contentChildren for querying the view.

Advanced State Management using NgRx
Master state management with NgRx, from classic patterns to the new Signal Store. The module includes an overview of state management patterns and the differences between NgRx Classic and Signal Store. It covers NgRx classic store implementation using createFeature, createActionGroup. The focus of this module is the @ngrx/signal Signal Store, with it's basic concepts and how to implement and use it. The module also covers side effects using rxMethod, usage of Store Features like Entity and Data Services as well as the implementation of custom store features.

Advanced Routing and App Initialization
Delve into advanced routing techniques and app initialization strategies. This module covers dependency injection, global error handling, lazy loading, and dynamic components. You’ll also learn about preloading strategies, route guards, and router animations, optimizing your application’s navigation and initialization. The module includes the use of APP_INITIALIZER, forwardRef, and functional resolvers for preloading component data. Additionally, it covers the use of auxiliary routes, router animations, and visual feedback indicators.

Securing Angular using Cloud Identities
Learn to secure your Angular applications using JWT, OAuth 2.0, and OpenID Connect. This module covers token-based authentication with NgRx, implementing an AuthModule, and optimizing application flow for authentication. You’ll also explore authentication using Microsoft Entra ID. The module includes the use of a facade service, components, guards, and interceptors for managing authentication. Additionally, it covers the recap of JWT, OAuth 2.0, and OpenID Connect for securing Angular applications.

Advanced Testing with Jasmine, Cypress, and NgRx
Enhance your testing skills with advanced techniques for Angular applications. This module covers testing tools like Jasmine, Karma, Jest, and Cypress. You’ll learn to test classes, services, components, and complex forms, as well as perform end-to-end testing and marble testing for observables. The module includes the use of HttpClientTestingModule and HttpTestingController for testing services. Additionally, it covers the use of mock store, mock selectors, reducers, effects, and facades for testing NgRx.

Reusability with Libraries, Nx & Angular Elements
Focus on creating reusable Angular artifacts. This module covers building and consuming Angular libraries, using Nx workspaces, and implementing Angular Elements. You’ll learn to publish libraries to GitHub Packages and create reusable web components, promoting code reuse and modularity. The module includes the use of Angular building blocks like workspace, apps, and libraries. Additionally, it covers the implementation of reusable web components using Angular Elements and standalone components.

Real-Time Micro-Frontends & Progressive Web Apps
Explore the world of micro-frontends and progressive web apps (PWAs). This module covers real-time connectivity, service workers, and PWA configuration. You’ll learn to install, update, and optimize PWAs, ensuring a seamless and responsive user experience. The module includes the introduction to micro-frontends and their real-time connectivity using cloud events or large language models responses. Additionally, it covers the understanding and configuring of service workers and manifests for PWAs.

Optimizing & Publishing Containerized Applications
Optimize and publish your Angular applications using containerization. This module covers performance optimization with Chrome Dev Tools and Lighthouse, bundle analysis, and change detection profiling. The module includes the use of virtual- and infinite scrolling for optimizing performance. Additionally, it covers the use of NgOptimizedImage for optimizing images and the introduction to zoneless change detection. You’ll also learn about accessibility best practices, linting, and autoformatting with Prettier. Finally it introduces the concepts of server-side rendering, Docker image creation, and configuration management for containerized deployments. 

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
- Unified Form Events
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

### Securing Angular using Cloud Identities

- Recap Jwt, OAuth 2.0 & OpenID Connect
- Token based Authentication in Angular with NgRx
- Implementing an AuthModule using a Facade Service, Components, Guards & Interceptors
- Optimizing Application Flow for Authentication
- Authentication using Microsoft Entra ID

### Advanced Testing with Jasmine, Cypress and NgRx

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
- Implementing, Publishing and Consuming Libraries to / from GitHub Packages
- Introduction to Nx Workspaces
- Reusable Web Components using Angular Elements and Standalone Components

### Real Time Micro-Frontends & Progressive Web Apps

- Introduction to Micro-Frontends 
- Real Time connected using Cloud Events or Large Language Models Responses
- Introduction to Progressive Web Apps
- Understanding and Configuring Service Workers & Manifests
- Installing & Updating Progressive Web Apps

### Optimizing & Publishing Containerized Applications

- Using Chrome Dev Tools & Lighthouse for Performance Optimization
- Understanding & Using Page Traces
- Analyzing and Optimizing Bundles 
- Logging NgRx to custom destinations using Meta-Reducers 
- Virtual- & Infinite Scrolling
- Understanding, Profiling & Optimizing Angular Change Detection
- Understanding & Optimizing Angular Change Detection
- Introduction to Zoneless Change Detection
- Optimizing Images using NgOptimizedImage 
- Using Linting and Autoformat with Prettier
- Accessibility A11y: Best Practices & Linting
- Introduction to Server Side Rendering (SSR) and Non-destructive hydration
- Configure Server Side Rendering & Pre-rendering
- Configuration Management and Config Injection Options
- Creating an Angular Multi-Stage Docker Image
- Overriding config in containers using environment variables