import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-ngrx-interop',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './ngrx-interop.component.html',
  styleUrl: './ngrx-interop.component.scss'
})
export class NgrxInteropComponent {

}
