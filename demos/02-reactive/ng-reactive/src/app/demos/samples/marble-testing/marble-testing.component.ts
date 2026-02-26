import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-marble-testing',
    templateUrl: './marble-testing.component.html',
    styleUrls: ['./marble-testing.component.scss'],
    imports: [MarkdownRendererComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarbleTestingComponent {
}
