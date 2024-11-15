import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [JsonPipe]
})
export class AppComponent {
  http = inject(HttpClient);
  title = 'ng-config-env';
  apiUrl = environment.api;
  cfg: any;

  ngOnInit(): void {
    this.http.get(this.apiUrl + '/settings').subscribe((settings) => {
      this.cfg = settings;
    });
  }
}
