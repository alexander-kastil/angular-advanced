
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-standalone',
    imports: [MarkdownRendererComponent],
    templateUrl: './standalone.component.html',
    styleUrls: ['./standalone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandaloneComponent { }

