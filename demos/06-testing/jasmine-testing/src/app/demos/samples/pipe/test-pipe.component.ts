import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { PhonenumberPipe } from './phonenumber.pipe';

@Component({
  selector: 'app-test-pipe',
  templateUrl: './test-pipe.component.html',
  styleUrls: ['./test-pipe.component.scss'],
  standalone: true,
  imports: [
    MarkdownRendererComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    PhonenumberPipe,
  ],
})
export class TestPipeComponent {
  phone = "3333333333";
}
