import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-deep-signal',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './deep-signal.component.html',
  styleUrl: './deep-signal.component.scss'
})
export class DeepSignalComponent {

}
