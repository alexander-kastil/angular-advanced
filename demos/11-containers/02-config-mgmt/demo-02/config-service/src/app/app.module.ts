import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
        {
            provide: APP_INITIALIZER,
            useFactory: configFactory,
            deps: [ConfigService],
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
