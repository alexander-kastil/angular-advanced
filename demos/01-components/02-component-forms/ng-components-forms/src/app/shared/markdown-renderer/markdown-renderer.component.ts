import { Component, input } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MarkdownComponent } from 'ngx-markdown';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-markdown-renderer',
  templateUrl: './markdown-renderer.component.html',
  styleUrls: ['./markdown-renderer.component.scss'],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MarkdownComponent,
  ]
})
export class MarkdownRendererComponent {
  md = input('');
  panelOpenState = true;

  getMarkdown(): string {
    return `${environment.markdownPath}${this.md()}.md`;
  }
}
