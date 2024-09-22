import { Injectable, inject } from '@angular/core';
import { AppConfig } from './app.config.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  http = inject(HttpClient);
  cfg = new BehaviorSubject<AppConfig | null>(null);

  apiUrl = this.cfg.asObservable().pipe(
    filter((cfg) => !!cfg),
    map((cfg) => cfg?.apiUrl)
  );

  loadConfig() {
    this.http.get<AppConfig>('./assets/config.json')
      .subscribe((config: AppConfig) => {
        this.cfg.next(config);
        console.log('config loaded :', this.cfg);
      });
  }
}
