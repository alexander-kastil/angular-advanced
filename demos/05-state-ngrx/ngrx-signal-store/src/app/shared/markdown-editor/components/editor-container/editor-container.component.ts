import { Component, inject } from '@angular/core';
import { CommentItem } from '../../comment.model';
import { MatButton } from '@angular/material/button';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { ColumnDirective } from '../../../formatting/formatting-directives';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { editorStore } from '../../editor.store';

@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ColumnDirective,
    CommentsListComponent,
    CommentEditComponent,
    MatCardActions,
    MatButton,
  ]
})
export class EditorContainerComponent {
  store = inject(editorStore);
  editorEdit = false;
  current: CommentItem | null = null;

  addComment() {
    this.current = new CommentItem();
    this.editorEdit = true;
  }

  saveComment() {
    if (this.current) {
      this.store.saveComment(this.current);
      this.editorEdit = false;
    }
  }

  deleteComment(item: CommentItem) {
    this.store.deleteComment(item);
  }

  editComment(item: CommentItem) {
    this.current = { ...item };
    this.editorEdit = true;
  }
}
