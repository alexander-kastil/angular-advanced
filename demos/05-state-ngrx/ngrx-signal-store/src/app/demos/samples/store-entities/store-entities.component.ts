import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-store-entities',
    imports: [MarkdownRendererComponent],
    templateUrl: './store-entities.component.html',
    styleUrl: './store-entities.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreEntitiesComponent {

}
