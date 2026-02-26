import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarkdownComponent } from 'ngx-markdown';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

@Component({
  selector: 'app-markdown-renderer',
  templateUrl: './markdown-renderer.component.html',
  styleUrls: ['./markdown-renderer.component.scss'],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MarkdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownRendererComponent {
  md = input.required<string>();
  panelOpenState = signal(true);

  getMarkdown(): string {
    return `${environment.markdownPath}${this.md()}.md`;
  }
}
