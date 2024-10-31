import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-deep-signals',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './deep-signals.component.html',
  styleUrl: './deep-signals.component.scss'
})
export class DeepSignalsComponent {

}
