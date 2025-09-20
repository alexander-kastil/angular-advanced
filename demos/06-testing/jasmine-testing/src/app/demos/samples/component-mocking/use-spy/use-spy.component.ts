import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-use-spy',
    templateUrl: './use-spy.component.html',
    styleUrls: ['./use-spy.component.scss'],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent
    ]
})
export class UseSpyComponent {
  auth = inject(AuthService);

  loggedIn = this.auth.isAuthenticated();
}
