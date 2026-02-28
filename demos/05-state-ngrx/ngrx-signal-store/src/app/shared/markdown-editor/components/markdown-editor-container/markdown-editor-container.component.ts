import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MarkdownItem } from '../../markdown.model';
import { MatButton } from '@angular/material/button';
import { MarkdownEditComponent } from '../markdown-edit/markdown-edit.component';
import { MarkdownListComponent } from '../markdown-list/markdown-list.component';
import { ColumnDirective } from '../../../formatting/formatting-directives';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { markdownEditorStore } from '../../markdown-editor.store';

@Component({
    selector: 'app-markdown-editor-container',
    templateUrl: './markdown-editor-container.component.html',
    styleUrls: ['./markdown-editor-container.component.scss'],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        ColumnDirective,
        MarkdownListComponent,
        MarkdownEditComponent,
        MatCardActions,
        MatButton,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorContainerComponent {
    store = inject(markdownEditorStore);
    readonly demoTitle = input('');
    readonly demoMd = input('');
    readonly demoUrl = input('');

    editorEdit = signal(false);
    current = signal<MarkdownItem | null>(null);

    get currentItem(): MarkdownItem { return this.current()!; }
    set currentItem(value: MarkdownItem) { this.current.set(value); }

    allItems = computed(() => {
        const items = this.store.entities();
        const title = this.demoTitle();
        const url = this.demoUrl();
        if (!title) return items;
        const saved = items.find(i => i.id === -1 && i.url === url);
        if (saved) return [saved, ...items.filter(i => !(i.id === -1 && i.url === url))];
        return [{ id: -1, url, title, comment: this.demoMd(), saved: undefined }, ...items];
    });

    isDemoSaved = computed(() => {
        const url = this.demoUrl();
        return this.store.entities().some(i => i.id === -1 && i.url === url);
    });

    addMarkdownItem() {
        this.current.set(new MarkdownItem());
        this.editorEdit.set(true);
    }

    saveMarkdownItem() {
        const item = this.current();
        if (item) {
            this.store.saveMarkdownItem(item);
            this.editorEdit.set(false);
        }
    }

    deleteMarkdownItem(item: MarkdownItem) {
        this.store.deleteMarkdownItem(item);
    }

    editMarkdownItem(item: MarkdownItem) {
        this.current.set({ ...item });
        this.editorEdit.set(true);
    }
}
