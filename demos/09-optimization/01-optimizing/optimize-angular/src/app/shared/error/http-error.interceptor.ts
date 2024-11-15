import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { AILoggerService } from '../logging/ailogger.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const ailogger = inject(AILoggerService);
  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    catchError((error) => {
      console.log('handling http error', error)
      ailogger.logEvent('Http Error', { error: error });
      throw new Error(error.message);
    })
  );
};