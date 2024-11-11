import { Component } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { BorderDirective, BoxedDirective, ColumnDirective } from '../../../shared/ux-lib/formatting/formatting-directives';

@Component({
    selector: 'app-directive-composition',
    templateUrl: './directive-composition.component.html',
    styleUrls: ['./directive-composition.component.scss'],
    imports: [
        MarkdownRendererComponent,
        BorderDirective,
        BoxedDirective,
        ColumnDirective,
    ]
})
export class DirectiveCompositionComponent {

}
