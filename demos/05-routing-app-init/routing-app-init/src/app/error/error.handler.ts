import { Injectable, Injector, ErrorHandler, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  injector = inject(Injector);

  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    console.warn('An error occurred:', error);
    if (error.message) {
      console.warn('Err Message:', error.message);
    }
    router.navigate(['/error'], { state: { data: (error as Error).message } });
  }
}
