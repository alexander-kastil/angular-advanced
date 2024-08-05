# Advanced Angular Development

Im Seminar "Advanced Angular Development" bringen wir Ihre Angular Kenntnisse auf Experten-Level. Großes Augenmerk legen wir darauf, in den Demos & Labs aktuelle Coding-Styles & Patterns zu verwenden. Wir besprechen mögliche Refactorings & Schematics für die Migration bestehender Lösungen und setzen dies fallweise in Form von Live-Coding & AI assisted Coding um.

Wir beginnen mit Standalone Components sowie, deren Konzepte und Migration bilden den Einstieg ins Module Components & Forms Deep Dive. 

Ein Schwerpunkt des Kurses ist der Themenblock Reactive Programming und State Management mit RxJS, NgRx & Signals, sowie Advanced Routing und App Initialization. 

Wir diskutieren die Implementierung von Authentifizierung mit Cloud Identities und Tests mit Jasmine, Jest, Cypress. Zusätzlich behandeln wir die Themen Reusability mit Libraries, Schematics, Nx & Angular Elements und Optimierung von Anwendungen, Server Side Rendering, sowie A11y.

Zum Abschluss implementieren wir ein Real Time connected Micro-Frontend als Progressive Web App und publizieren Angular Apps in die Cloud mittels Containern und Enterprise-ready Config Management.

Nach Abschluss des Kurses haben die Teilnehmer Kenntnisse zu folgenden Themen:

Standalone Components: Concepts & Migration
Components & Forms Deep Dive
Mastering Reactive Programming using RxJs
Advanced State Management using NgRx
Mastering Reactivity using Signals
Advanced Routing and App Initialization
Securing Angular using Cloud Identities
Advanced Testing with Jasmine, Jest, Cypress and NgRx
Reusability with Libraries, Schematics, Nx & Angular Elements
Optimizing Applications & Server Side Rendering & A11y
Implementing & publishing a Real Time connected Micro-Frontend as a Progressive Web App
Publishing Angular Apps to the Cloud using Containers and Config Injection

Neue Themengebiete werden anhand von Folien und Demos erarbeitet. Am Ende der Module werden die erlernten Inhalte als Lab in eine durchgängige Anwendung integriert, welches am Ende in die Cloud publiziert werden kann. 


## Standalone Components: Concepts & Migration

- Standalone Components vs Modules
- Creation, Bootstrapping 
- Registering Providers & Dependency Injection
- Routing & Lazy Loading
- Migration to Standalone Components

## Components & Forms Deep Dive

- Using & Migrating to Control Flow Syntax
- Deferred Loading
- Standalone Directives & Directives Composition Api
- Components and Required Inputs
- Content Projection 
- Templates TemplateRef, *ngTemplateOutlet
- Comparison: ng-template vs ng-content - pro / cons
- HostBinding & HostListener
- Reactive Forms Revisited (FormGroup, Form Builder, FormControl, FormArray)
- Unified Form Events
- Typed Forms Nullability, NonNullableFormBuilder, GetRawValue
- Partial Values, Optional Controls, Dynamic Groups and FormRecord
- Form Control State Change Events
- Cascading Form Controls
- Implementing Custom Controls using ControlValueAccessor
- Typed Forms Validation & Custom Validators
- Handling FormErrors & ErrorStateMatcher

## Mastering Reactive Programming using RxJS

- Introduction to RxJS
- Observables, Observers & Use Cases
- Imperative vs Declarative Reactive Programming
- Data- vs Action-Streams
- Mouse & DOM Events as Observables
- Unsubscribing DestroyRef & takeUntilDestroyed
- Base Operators: Mapping, Filtering, Merging, 
- Understanding Marble Diagrams & Debugging Observables
- Marble-testing RxJS
- Combination & Transformation Operators
- Retry & Error Handling Strategies
- Implementing & Testing Custom Observable Operators

## Advanced State Management using NgRx

- Overview State Management Patterns
- Introduction to the Redux Pattern & NgRx
- Feature State and ActionReducerMap
- Implementing NgRx Store, Reducers & Selectors using createFeature
- Actions & createActionGroup
- Debugging NgRx using Redux Dev Tools
- Effects, Facades, @ngrx/entity adapters
- Simplifying Data Access with @ngrx/data
- Implementing a reactive View Model
- Using @ngrx/component-store

## Mastering Reactivity using Signals

- Introduction to Signals (WritableSignal, Computed, Effects)
- Signals vs Observables: Synchronous  & Asynchronous Reactive Programming
- Signal Queries: viewChild, -Children, contentChild, -Children
- Signals & Ngrx Interoperability
- Nesting Components using Signals, input, output & model
- Communication between Components using Event Bus Pattern
- Creating a Signals Store using @ngrx/signals
- Side Effects using rxMethod
- Zoneless Change Detection using Signals

## Advanced Routing and App Initialization

- Dependency Injection in Depth: Resolution modifiers and Dependency providers
- Using Constructor vs inject for DI
- APP_INITIALIZER, Injection & forwardRef
- Implementing Global Error Handling and Retry-Patterns
- Modules & Code Splitting
- Introduction to @ngrx/router-store
- Routing using NgRx Actions
- Binding Router-Params to Component Inputs
- Route Redirect Functions
- Functional Route Guards & Interceptors
- View Transition Api
- Auxiliary Routes: Common use cases
- Preloading Component Data from NgRx using Functional Resolvers
- Using Preloading Strategies
- Router Animations & Anchor Scrolling
- Introduction to Visual Feedback (Loading-, Saving-, ...-Indicator)

## Securing Angular using Cloud Identities

- Recap Jwt, OAuth 2.0 & OpenID Connect
- Token based Authentication in Angular with NgRx
- Implementing an AuthModule using a Facade Service, Components, Guards & Interceptors
- Optimizing Application Flow for Authentication
- Authentication using Microsoft Entra ID

## Advanced Testing with Jasmine, Cypress and NgRx

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

## Reusability with Libraries, Nx, Schematics & Angular Elements

- Angular Building Blocks: Workspace, Apps, Libraries
- Reusable Artifacts using Angular Libraries
- Implementing, Publishing and Consuming Libraries to / from GitHub Packages
- Introduction to Nx Workspaces
- Understanding and Implementing Schematics
- Implementing Web Components using Angular Elements and Standalone Components

## Implementing a Real Time connected Micro-Frontend as a Progressive Web App

- Introduction to Micro-Frontend and Event Driven Architecture (EDA)
- Implementing a Real Time connected Micro-Frontend listening to Cloud Events
- Introduction to Progressive Web Apps
- Understanding and Configuring Service Workers & Manifests
- Installing & Updating Progressive Web Apps
- Introduction to Module Federation

## Building & Optimizing Applications

- Using Chrome Dev Tools & Lighthouse for Performance Optimization
- Analyzing and Optimizing Bundles & Modules
- Understanding & Using Page Traces
- Optimizing Images using NgOptimizedImage 
- Logging NgRx to custom destinations using Meta-Reducers 
- Virtual- & Infinite Scrolling
- Understanding, Profiling & Optimizing Angular Change Detection
- Understanding & Optimizing Angular Change Detection
- Introduction to Zoneless Change Detection
- Using Linting and Autoformat with Prettier
- Accessibility A11y: Best Practices & Linting
- Introduction to Server Side Rendering (SSR) and Non-destructive hydration
- Why Server Side Rendering
- Configure Server Side Rendering & Pre-rendering

## Publishing Angular App using Containers and Config Injection

- Deployment Overview & Cloud Hosting Options
  -  Using ng deploy to publish to Firebase
  -  Deploy to Azure Static Webapp 
- Configuration Management and Config Injection Options
  - Using a config service
  - Creating an Angular Multi-Stage Docker Image
  - Overriding config in containers using environment variables
- Deploy to a Cloud Container Host (Azure Container Apps)
  - Azure Container Apps Overview
  - Publish & Configure Api & Angular UI Containers
