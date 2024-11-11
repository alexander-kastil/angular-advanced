import { Injectable, inject } from '@angular/core';
import { AppConfig } from './app.config.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  http = inject(HttpClient);
  sbs = inject(SnackbarService);
  cfg: AppConfig = new AppConfig();

  loadConfig() {
    this.http
      .get<AppConfig>('config.json')
      .pipe(
        catchError((err: Error) => {
          this.sbs.displayAlert('Startup Err', 'config.json not found');
          // Return default config to resume - mock
          const cfg = environment;
          const defaultConfig = { ...new AppConfig(), ...cfg };
          return of(defaultConfig);
        })
      )
      .subscribe((config: any) => {
        this.cfg = config;
        console.log('Config loaded', this.cfg);
      });
  }
}
