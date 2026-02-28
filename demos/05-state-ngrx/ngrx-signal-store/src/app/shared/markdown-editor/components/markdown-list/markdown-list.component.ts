import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MarkdownItem } from '../../markdown.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-markdown-list',
    templateUrl: './markdown-list.component.html',
    styleUrls: ['./markdown-list.component.scss'],
    imports: [MatButton, MatIcon, MatTooltip],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownListComponent {
    readonly items = input<MarkdownItem[] | null>(null);
    readonly demoUrl = input('');
    readonly demoSaved = input(false);
    readonly onItemEdit = output<MarkdownItem>();
    readonly onItemDelete = output<MarkdownItem>();

    editItem(item: MarkdownItem) {
        this.onItemEdit.emit(item);
    }

    deleteMarkdownItem(item: MarkdownItem) {
        this.onItemDelete.emit(item);
    }
}
