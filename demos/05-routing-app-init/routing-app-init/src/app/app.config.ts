import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { DefaultDataServiceConfig, provideEntityData, withEffects } from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MarkdownModule } from 'ngx-markdown';
import { AppInitService } from './app-init/app-init.service';
import { ConfigService } from './app-init/config.service';
import { appRoutes } from './app.routes';
import * as customerEffects from './customers/state/customers.effects';
import { customerState } from './customers/state/customers.state';
import * as demoEffects from './demos/state/demos.effects';
import { demoState } from './demos/state/demos.state';
import { globalErrorHandler } from './error/error.handler';
import { httpErrorInterceptor } from './error/http-error.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
import { authState } from './mock-auth/state/auth.state';
import * as editorEffects from './shared/markdown-editor/state/editor.effects';
import { editorState } from './shared/markdown-editor/state/editor.state';
import { skillsDataServiceConfig } from './skills/skills-data.service.config';
import { skillsEntityConfig } from './skills/skills.metadata';
import { appState } from './state/app.state';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([
                authInterceptor,
                httpErrorInterceptor
            ])
        ),
        provideRouter(
            appRoutes,
            withComponentInputBinding(),
            withViewTransitions()
        ),
        provideAnimations(),
        importProvidersFrom(
            MarkdownModule.forRoot(),
        ),
        // NgRx
        provideStore(),
        provideState(appState),
        provideState(demoState),
        provideState(customerState),
        provideState(editorState),
        provideState(authState),
        provideEffects(demoEffects),
        provideEffects(customerEffects),
        provideEffects(editorEffects),
        // NgRx Data -> Skills
        provideEntityData(skillsEntityConfig, withEffects()),
        { provide: DefaultDataServiceConfig, useValue: skillsDataServiceConfig },
        //NgRx DevTools
        provideStoreDevtools({ maxAge: 25 }),
        // Application Init
        provideAppInitializer(() => console.log('App init running')),
        provideAppInitializer(() => inject(AppInitService).loadData()),
        provideAppInitializer(() => inject(ConfigService).loadConfig()),
        {
            provide: ErrorHandler,
            useValue: globalErrorHandler,
        },
        provideAnimationsAsync(),
    ]
};