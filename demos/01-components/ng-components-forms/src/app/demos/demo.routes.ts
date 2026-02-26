import { Routes } from '@angular/router';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { BootstrapStandaloneComponent } from './samples/bootstrap-standalone/bootstrap-standalone.component';
import { ReactiveCascadeComponent } from './samples/cascade/reactive-cascade.component';
import { ContainerPresenterComponent } from './samples/container-presenter/container-presenter.component';
import { ContentChildComponent } from './samples/content-child/content-child.component';
import { ContentProjectionComponent } from './samples/content-projection/content-projection.component';
import { ControlFlowComponent } from './samples/control-flow/control-flow.component';
import { DirectiveCompositionComponent } from './samples/directive-composition/directive-composition.component';
import { DynamicComponentsComponent } from './samples/dynamic-components/dynamic-components.component';
import { ErrStateMatcherComponent } from './samples/err-state-matcher/err-state-matcher.component';

import { FormArrayComponent } from './samples/form-array/form-array.component';
import { FormControlComponent } from './samples/form-control/form-control.component';
import { FormErrorsComponent } from './samples/form-errors/form-errors.component';
import { FormBuilderComponent } from './samples/forms-builder/forms-builder.component';

import { HostBindingListenerComponent } from './samples/host-binding-listener/host-binding-listener.component';
import { ReactiveNestedComponent } from './samples/nested-objects/reactive-nested.component';
import { SignalFormsConditionalComponent } from './samples/signal-forms-conditional/signal-forms-conditional.component';
import { SignalFormsSubmitComponent } from './samples/signal-forms-submit/signal-forms-submit.component';
import { ReactiveFormsComponent } from './samples/reactive-forms/reactive-forms.component';

import { StandaloneComponent } from './samples/standalone/standalone.component';
import { ReactiveValidationComponent } from './samples/state-validators/reactive-validation.component';
import { TemplateVsContainerComponent } from './samples/template-vs-container/template-vs-container.component';

import { ReactiveTypedValidationComponent } from './samples/validaton-intro/reactive-typed-validaton.component';
import { ViewChildComponent } from './samples/view-child/view-child.component';
import { ControlEventsComponent } from './samples/control-events/control-events.component';

export const demoRoutes: Routes = [
  {
    path: '',
    component: DemoContainerComponent,
    children: [
      { path: 'control-flow', component: ControlFlowComponent },
      { path: 'standalone', component: StandaloneComponent },
      {
        path: 'lazy-standalone',
        loadComponent: () =>
          import('./samples/lazy-standalone/lazy-standalone.component').then(
            (c) => c.LazyStandaloneComponent
          ),
      },
      { path: 'standalone-bootstrap', component: BootstrapStandaloneComponent },
      { path: 'view-queries', component: ViewChildComponent },
      { path: 'content-child', component: ContentChildComponent },
      { path: 'template-vs-container', component: TemplateVsContainerComponent },
      { path: 'host-binding', component: HostBindingListenerComponent },
      { path: 'reactive-nested', component: ReactiveNestedComponent },
      { path: 'validation-typed', component: ReactiveTypedValidationComponent },
      { path: 'content-projection', component: ContentProjectionComponent },
      { path: 'container-presenter', component: ContainerPresenterComponent },
      { path: 'reactive-forms', component: ReactiveFormsComponent },

      { path: 'form-builder', component: FormBuilderComponent },
      { path: 'form-control', component: FormControlComponent },
      { path: 'control-events', component: ControlEventsComponent },
      { path: 'form-array', component: FormArrayComponent },
      { path: 'form-errors', component: FormErrorsComponent },
      { path: 'err-state-matcher', component: ErrStateMatcherComponent },
      { path: 'dynamic-components', component: DynamicComponentsComponent },
      { path: 'validation', component: ReactiveValidationComponent },
      { path: 'cascade', component: ReactiveCascadeComponent },

      { path: 'signal-forms-conditional', component: SignalFormsConditionalComponent },
      { path: 'signal-forms-submit', component: SignalFormsSubmitComponent },
      {
        path: 'directives-composition',
        component: DirectiveCompositionComponent,
      },
    ],
  },
];