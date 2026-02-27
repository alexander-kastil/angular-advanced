import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-simple-service',
    templateUrl: './simple-service.component.html',
    styleUrls: ['./simple-service.component.scss'],
    imports: [MarkdownRendererComponent]
})
export class SimpleServiceComponent {

}
