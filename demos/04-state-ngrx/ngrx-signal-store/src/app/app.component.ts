import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavbarComponent, RouterOutlet],
  // TODO: This component has been partially migrated to be zoneless-compatible.
  // After testing, this should be updated to ChangeDetectionStrategy.OnPush.
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  readonly titleService = inject(Title);
  readonly title = signal(environment.title);

  constructor() {
    this.titleService.setTitle(this.title());
  }
}
