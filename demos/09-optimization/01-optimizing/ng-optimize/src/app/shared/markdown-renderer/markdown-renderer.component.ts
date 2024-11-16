import { Component, inject, input } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MarkdownComponent } from 'ngx-markdown';
import { environment } from '../../../environments/environment';
import { RendererStateService } from './renderer-state.service';

@Component({
  selector: 'app-markdown-renderer',
  templateUrl: './markdown-renderer.component.html',
  styleUrls: ['./markdown-renderer.component.scss'],
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MarkdownComponent,
  ],
})
export class MarkdownRendererComponent {
  state = inject(RendererStateService);
  md = input.required<string>();
  contentVisible = this.state.instructionsVisible();

  private isDragging = false;
  onMouseDown(event: MouseEvent): void {
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent): void {
    this.isDragging = true;
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) {
      this.togglePanel();
    }
    this.isDragging = false;
  }

  getMarkdown(): string {
    return `${environment.markdownPath}${this.md()}.md`;
  }

  togglePanel() {
    this.state.toggleVisibility();
  }
}
