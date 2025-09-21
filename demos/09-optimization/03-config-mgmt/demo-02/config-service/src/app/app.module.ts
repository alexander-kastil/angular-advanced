import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { configFactory } from './config/config.factory';
import { ConfigService } from './config/config.service';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule], providers: [
        // {
        //   provide: APP_INITIALIZER,
        //   useValue: () => console.log('APP_INITIALIZER'),
        //   multi: true,
        // },
        provideAppInitializer(() => {
        const initializerFn = (configFactory)(inject(ConfigService));
        return initializerFn();
      }),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
