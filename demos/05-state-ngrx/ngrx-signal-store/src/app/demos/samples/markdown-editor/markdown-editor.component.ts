import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-markdown-editor',
  imports: [MarkdownRendererComponent],
  templateUrl: './markdown-editor.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorComponent {

}
