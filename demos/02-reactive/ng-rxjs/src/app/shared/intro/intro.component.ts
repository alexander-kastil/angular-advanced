import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { CenteredDirective, ColumnDirective } from '../ux-lib/formatting/formatting-directives';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    ColumnDirective,
    CenteredDirective,
    MatCardActions,
    MatButton,
    RouterLink,
  ],
})
export class IntroComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() img: string = '';
}
