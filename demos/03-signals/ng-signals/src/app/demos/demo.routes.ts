import { Routes } from '@angular/router';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { ContainerPresenterSignalsComponent } from './samples/container-presenter/container-presenter-signals.component';
import { ModelInputsComponent } from './samples/model-inputs/model-inputs.component';
import { RxjsInteropComponent } from './samples/rxjs-interop/rxjs-interop.component';
import { SelectSignalComponent } from './samples/select-signal/select-signal.component';
import { SignalEffectsComponent } from './samples/signal-effects/signal-effects.component';
import { SignalInputsComponent } from './samples/signal-inputs/signal-inputs.component';
import { SignalsBasicsComponent } from './samples/signals-basics/signals-basics.component';
import { SignalsEventBusComponent } from './samples/signals-event-bus/signals-event-bus.component';
import { ZonelessChangeDetectionComponent } from './samples/zoneless-change-detection/zoneless-change-detection.component';
import { DeepSignalsComponent } from './samples/deep-signals/deep-signals.component';
import { HttpResourceComponent } from './samples/http-resource/http-resource.component';

export const demoRoutes: Routes = [
  {
    path: '',
    component: DemoContainerComponent,
    children: [
      { path: 'signals-basics', component: SignalsBasicsComponent },
      { path: 'signals-effects', component: SignalEffectsComponent },
      { path: 'deep-signals', component: DeepSignalsComponent },
      { path: 'rxjs-interop', component: RxjsInteropComponent },
      { path: 'signal-inputs', component: SignalInputsComponent },
      { path: 'model-inputs', component: ModelInputsComponent },
      { path: 'signals-event-bus', component: SignalsEventBusComponent },
      { path: 'select-signal', component: SelectSignalComponent },
      { path: 'container-presenter', component: ContainerPresenterSignalsComponent },
      { path: 'zoneless-change-detection', component: ZonelessChangeDetectionComponent },
      { path: 'http-resource', component: HttpResourceComponent },
    ],
  },
];
