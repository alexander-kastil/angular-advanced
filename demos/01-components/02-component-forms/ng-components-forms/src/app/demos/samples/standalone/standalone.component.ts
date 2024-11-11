import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-standalone',
    imports: [MarkdownRendererComponent],
    templateUrl: './standalone.component.html',
    styleUrls: ['./standalone.component.scss']
})
export class StandaloneComponent { }

