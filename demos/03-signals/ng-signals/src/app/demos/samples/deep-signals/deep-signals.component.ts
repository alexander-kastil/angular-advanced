import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-deep-signals',
    imports: [MarkdownRendererComponent],
    templateUrl: './deep-signals.component.html',
    styleUrl: './deep-signals.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeepSignalsComponent {

}
