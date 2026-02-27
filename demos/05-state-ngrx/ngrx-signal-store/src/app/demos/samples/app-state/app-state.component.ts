import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-app-state',
    templateUrl: './app-state.component.html',
    styleUrls: ['./app-state.component.scss'],
    imports: [MarkdownRendererComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppStateComponent { }
