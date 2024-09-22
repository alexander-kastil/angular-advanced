import { Component } from '@angular/core';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-selectors',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './selectors.component.html',
  styleUrl: './selectors.component.scss'
})
export class SelectorsComponent {

}
