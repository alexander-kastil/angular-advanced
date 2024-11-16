import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationInsightsService {
  private static logger: ApplicationInsights;

  static getInstance(): ApplicationInsights {
    this.initAppInsights();
    return this.logger;
  }

  constructor() {
    ApplicationInsightsService.initAppInsights();
  }

  static loggingEnabled(): boolean {
    return (
      environment.appInsightsKey != '' &&
      environment.appInsights
    );
  }

  static initAppInsights() {
    if (ApplicationInsightsService.loggingEnabled()) {
      this.logger = new ApplicationInsights({
        config: {
          instrumentationKey: environment.appInsightsKey,
          enableAutoRouteTracking: true,
        },
      });
      this.logger.loadAppInsights();
      this.logger.trackEvent({ name: 'Application Insights configured' });
    }
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    if (ApplicationInsightsService.loggingEnabled()) {
      ApplicationInsightsService.logger.trackEvent({ name, properties });
    } else {
      console.log('logging is not enabled');
    }
  }
}
