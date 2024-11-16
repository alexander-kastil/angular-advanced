import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { ApplicationInsightsService } from '../logging/app-insights.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const aILogger = inject(ApplicationInsightsService);
  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    catchError((error) => {
      console.log('handling http error', error)
      aILogger.logEvent('Http Error', { error: error });
      throw new Error(error.message);
    })
  );
};