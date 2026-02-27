import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-ngrx-interop',
    imports: [MarkdownRendererComponent],
    templateUrl: './ngrx-interop.component.html',
    styleUrl: './ngrx-interop.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxInteropComponent {

}
