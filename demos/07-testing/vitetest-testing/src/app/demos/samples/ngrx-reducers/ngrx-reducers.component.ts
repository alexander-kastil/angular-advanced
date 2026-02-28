import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-ngrx-reducers',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ngrx-reducers.component.html',
    styleUrls: ['./ngrx-reducers.component.scss'],
    imports: [MarkdownRendererComponent]
})
export class NgrxReducersComponent {

}
