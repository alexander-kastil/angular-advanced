import { ErrorHandler, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export function globalErrorHandler(error: Error | HttpErrorResponse) {
  const router = inject(Router);
  console.warn('An error occurred:', error);
  if (error.message) {
    console.warn('Err Message:', error.message);
  }
  router.navigate(['/error'], { state: { data: (error as Error).message } });
}
