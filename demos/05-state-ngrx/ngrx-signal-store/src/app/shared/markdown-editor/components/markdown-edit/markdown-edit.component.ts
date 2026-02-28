import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { MarkdownItem } from '../../markdown.model';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ColumnDirective } from '../../../formatting/formatting-directives';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { form, FormField } from '@angular/forms/signals';

@Component({
    selector: 'app-markdown-edit',
    templateUrl: './markdown-edit.component.html',
    styleUrls: ['./markdown-edit.component.scss'],
    imports: [
        ColumnDirective,
        MatFormField,
        MatLabel,
        MatInput,
        CdkTextareaAutosize,
        FormField,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditComponent {
    private http = inject(HttpClient);
    readonly markdownItem = model(new MarkdownItem());
    readonly mdSrc = model<string | null>(null);

    itemForm = form(this.markdownItem);

    constructor() {
        effect(() => {
            const src = this.mdSrc();
            if (src) {
                this.http.get(`${environment.markdownPath}${src}.md`, { responseType: 'text' })
                    .subscribe(content => this.markdownItem.update(item => ({ ...item, comment: content })));
            }
        });
    }
}
