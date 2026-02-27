import { Component, Input } from '@angular/core';
import { CommentItem } from '../../comment.model';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ColumnDirective, GapDirective } from '../../../formatting/formatting-directives';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-comment-edit',
    templateUrl: './comment-edit.component.html',
    styleUrls: ['./comment-edit.component.scss'],
    imports: [
        ColumnDirective,
        GapDirective,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        MarkdownComponent,
    ]
})
export class CommentEditComponent {
  @Input() comment: CommentItem = new CommentItem();
}
