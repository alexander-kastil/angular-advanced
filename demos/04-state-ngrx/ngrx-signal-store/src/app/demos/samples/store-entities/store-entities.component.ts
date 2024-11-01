import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-store-entities',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './store-entities.component.html',
  styleUrl: './store-entities.component.scss'
})
export class StoreEntitiesComponent {

}
