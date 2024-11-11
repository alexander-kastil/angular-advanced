import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { MarkdownModule } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(appRoutes),
        provideAnimations(),
        importProvidersFrom(
            MarkdownModule.forRoot(),
        )
    ]
};