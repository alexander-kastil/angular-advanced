import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-app-init',
    templateUrl: './app-init.component.html',
    styleUrls: ['./app-init.component.scss'],
    standalone: true,
    imports: [MarkdownRendererComponent]
})
export class AppInitComponent {
}
