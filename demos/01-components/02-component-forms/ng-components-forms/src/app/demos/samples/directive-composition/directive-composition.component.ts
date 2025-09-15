import { Component } from '@angular/core';
import { FontBoldDirective, HeightDirective, WidthDirective, BorderDirective, BoxedDirective, ColumnDirective } from '../../../shared/ux-lib/formatting/formatting-directives';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-directive-composition',
    templateUrl: './directive-composition.component.html',
    styleUrls: ['./directive-composition.component.scss'],
    imports: [
        MarkdownRendererComponent,
        BorderDirective,
        BoxedDirective,
        ColumnDirective
    ]
})
export class DirectiveCompositionComponent {

}
