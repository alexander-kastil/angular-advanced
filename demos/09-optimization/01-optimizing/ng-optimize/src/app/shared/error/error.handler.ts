import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInsightsService } from '../logging/app-insights.service';

export function globalErrorHandler(error: Error | HttpErrorResponse) {
  const router = inject(Router);
  const ailogger = inject(ApplicationInsightsService);
  console.warn('An error occurred:', error);
  ailogger.logEvent('General Errors', { error: error });
  if (error.message) {
    console.warn('Err Message:', error.message);
  }
  router.navigate(['/error'], { state: { data: (error as Error).message } });
}
