import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DefaultDataServiceConfig, EntityDataService, provideEntityData, withEffects } from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MarkdownModule } from 'ngx-markdown';
import { appRoutes } from './app.routes';
import * as demoEffects from './demos/state/demos.effects';
import { demoState } from './demos/state/demos.state';
import { LoadingInterceptor } from './shared/loading/loading-interceptor';
import { LoadingService } from './shared/loading/loading.service';
import * as editorEffects from './shared/markdown-editor/state/editor.effects';
import { editorState } from './shared/markdown-editor/state/editor.state';
import { SkillsDataService } from './skills/skills-data.service';
import { skillsDataServiceConfig } from './skills/skills-data.service.config';
import { skillsEntityConfig } from './skills/skills.metadata';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideAnimations(),
        //NgRx
        provideStore(),
        provideEffects(demoEffects),
        provideEffects(editorEffects),
        // State Slices
        provideState(demoState),
        provideState(editorState),
        // NgRx Data
        provideEntityData(skillsEntityConfig, withEffects()),
        { provide: DefaultDataServiceConfig, useValue: skillsDataServiceConfig },
        // Registration of a custom EntityDataService - if you do not need it skip it
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue() {
                const entityDataService = inject(EntityDataService);
                const skillsDataService = inject(SkillsDataService);
                entityDataService.registerService('Skill', skillsDataService);
            },
            multi: true,
        },
        // NgRx DevTools
        provideStoreDevtools({ maxAge: 25 }),
        LoadingService,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        // Markdown
        importProvidersFrom(
            MarkdownModule.forRoot(),
        )
    ]
};