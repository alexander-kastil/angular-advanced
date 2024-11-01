import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-store-crud',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './store-crud.component.html',
  styleUrl: './store-crud.component.scss'
})
export class StoreCrudComponent {

}
