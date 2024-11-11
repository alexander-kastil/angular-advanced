import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-lazy-standalone',
    imports: [
        MarkdownRendererComponent,
        RouterModule
    ],
    templateUrl: './lazy-standalone.component.html',
    styleUrls: ['./lazy-standalone.component.scss']
})
export class LazyStandaloneComponent {
}
