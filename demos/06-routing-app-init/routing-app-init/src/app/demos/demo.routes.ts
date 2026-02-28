import { Routes } from '@angular/router';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { AppInitComponent } from './samples/app-init/app-init.component';
import { CanMatchGuardComponent } from './samples/can-match-guard/can-match-guard.component';
import { DiInjectComponent } from './samples/di-inject/di-inject.component';
import { GlobalErrorsComponent } from './samples/global-errors/global-errors.component';
import { HttpErrorsComponent } from './samples/http-errors/http-errors.component';
import { HttpResourceComponent } from './samples/http-resource/http-resource.component';
import { MembersComponent } from './samples/multi-guard/members/members.component';
import { MultiGuardComponent } from './samples/multi-guard/multi-guard.component';
import { onlyAuthenticatedGuard } from './samples/multi-guard/only-authenticated.guard';
import { onlyPrimeMembersGuard } from './samples/multi-guard/only-prime-members.guard';
import { PrimeComponent } from './samples/multi-guard/prime/prime.component';
import { MultiInterceptorComponent } from './samples/multi-interceptor/multi-interceptor.component';
import { NgrxRouterActionsComponent } from './samples/ngrx-router-actions/ngrx-router-actions.component';
import { PreloadingNgrxComponent } from './samples/preloading-ngrx/preloading-ngrx.component';
import { PreloadingStrategyComponent } from './samples/preloading-strategy/preloading-strategy.component';
import { RouterAnimationsComponent } from './samples/router-animations/router-animations.component';
import { RouterBindingComponent } from './samples/router-binding/router-binding.component';
import { RouteTitlesComponent } from './samples/route-titles/route-titles.component';
import { RoutingTargetComponent } from './samples/routing/routing-target/routing-target.component';
import { RoutingComponent } from './samples/routing/routing/routing.component';
import { ViewTransitionsComponent } from './samples/view-transitions/view-transitions.component';

export const demoRoutes: Routes = [
    {
        path: '',
        component: DemoContainerComponent,
        children: [
            {
                path: 'inject',
                component: DiInjectComponent,
                title: 'DI: Inject & Provide'
            },
            {
                path: 'app-init',
                component: AppInitComponent,
                title: 'App Initialization'
            },
            {
                path: 'ngrx-routing',
                component: RoutingComponent,
                title: 'NgRx Router State',
                children: [{ path: ':id', component: RoutingTargetComponent }],
            },
            {
                path: 'router-bindings',
                component: RouterBindingComponent,
                title: 'Component Input Bindings'
            },
            {
                path: 'route-titles',
                component: RouteTitlesComponent,
                title: 'Route Titles'
            },
            {
                path: 'preloading-strategy',
                component: PreloadingStrategyComponent,
                title: 'Preloading Strategy'
            },
            {
                path: 'http-resource',
                component: HttpResourceComponent,
                title: 'HTTP Resource'
            },
            {
                path: 'can-match-guard',
                component: CanMatchGuardComponent,
                title: 'CanMatch Guard'
            },
            {
                path: 'ngrx-resolver',
                component: PreloadingNgrxComponent,
                title: 'NgRx Data Preload'
            },
            {
                path: 'view-transitions',
                component: ViewTransitionsComponent,
                title: 'View Transitions'
            },
            {
                path: 'ngrx-router-actions',
                component: NgrxRouterActionsComponent,
                title: 'NgRx Router Actions'
            },
            {
                path: 'multi-guard',
                component: MultiGuardComponent,
                title: 'Route Guards',
                children: [
                    {
                        path: 'members',
                        component: MembersComponent,
                        canActivate: [
                            onlyAuthenticatedGuard
                        ],
                    },
                    {
                        path: 'prime',
                        component: PrimeComponent,
                        canActivate: [
                            onlyAuthenticatedGuard,
                            onlyPrimeMembersGuard
                        ],
                    },
                ],
            },
            {
                path: 'multi-interceptor',
                component: MultiInterceptorComponent,
                title: 'HTTP Interceptors'
            },
            {
                path: 'global-errors',
                component: GlobalErrorsComponent,
                title: 'Global Error Handler'
            },
            {
                path: 'http-errors',
                component: HttpErrorsComponent,
                title: 'HTTP Error Handler'
            },
            {
                path: 'router-animations',
                component: RouterAnimationsComponent,
                title: 'Router Animations'
            }
        ],
    },
];
