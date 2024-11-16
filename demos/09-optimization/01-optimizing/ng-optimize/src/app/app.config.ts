import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DefaultDataServiceConfig, provideEntityData, withEffects } from '@ngrx/data';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MarkdownModule } from 'ngx-markdown';
import { appRoutes } from './app.routes';
import { httpErrorInterceptor } from './shared/error/http-error.interceptor';
import { skillsDataServiceConfig } from './skills/skills-data.service.config';
import { skillsEntityConfig } from './skills/skills.metadata';

export const appConfig: ApplicationConfig = {
    providers: [
        [
            provideHttpClient(
                withInterceptors(
                    [httpErrorInterceptor]
                )
            ),
            provideAnimations(),
            provideRouter(
                appRoutes,
                withComponentInputBinding()
            ),
            importProvidersFrom(
                MarkdownModule.forRoot(),
            ),
            // NgRx base used for skills
            provideStore(),
            // NgRx Data -> Skills
            provideEntityData(skillsEntityConfig, withEffects()),
            { provide: DefaultDataServiceConfig, useValue: skillsDataServiceConfig },
            // Redux DevTools
            provideStoreDevtools({ maxAge: 25 }),
            // {
            //     provide: ErrorHandler,
            //     useValue: globalErrorHandler,
            // },
        ]
    ]
};   