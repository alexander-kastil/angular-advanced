import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-container-presenter-ngrx',
    templateUrl: './container-presenter-ngrx.component.html',
    styleUrls: ['./container-presenter-ngrx.component.scss'],
    imports: [MarkdownRendererComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerPresenterNgrxComponent {

}
