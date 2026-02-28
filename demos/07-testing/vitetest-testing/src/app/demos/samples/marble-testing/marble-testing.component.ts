import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-marble-testing',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './marble-testing.component.html',
    styleUrls: ['./marble-testing.component.scss'],
    imports: [MarkdownRendererComponent]
})
export class MarbleTestingComponent {
}
