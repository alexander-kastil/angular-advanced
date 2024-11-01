import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-custom-store-features',
  standalone: true,
  imports: [MarkdownRendererComponent],
  templateUrl: './custom-store-features.component.html',
  styleUrl: './custom-store-features.component.scss'
})
export class CustomStoreFeaturesComponent {

}
