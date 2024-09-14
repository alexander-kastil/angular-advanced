import { Component } from '@angular/core';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-view-transitions',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './view-transitions.component.html',
  styleUrl: './view-transitions.component.scss'
})
export class ViewTransitionsComponent {

}
