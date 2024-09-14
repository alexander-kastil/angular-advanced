import { Component } from '@angular/core';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-zoneless-change-detection',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './zoneless-change-detection.component.html',
  styleUrl: './zoneless-change-detection.component.scss'
})
export class ZonelessChangeDetectionComponent {

}
