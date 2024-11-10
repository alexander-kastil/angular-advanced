import { Component, effect, signal } from '@angular/core';
import { deepComputed } from '@ngrx/signals';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { customersRoutes } from '../../../customers/customer.routes';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-deep-signals',
    standalone: true,
    imports: [
        MarkdownRendererComponent,
        MatButton,
        JsonPipe
    ],
    templateUrl: './deep-signals.component.html',
    styleUrls: ['./deep-signals.component.scss']
})
export class DeepSignalsComponent {
    limit = signal(10);
    current = signal(0);
    totalItems = signal(100);

    pagination = deepComputed(() => ({
        currentPage: this.current(),
        pageSize: this.limit(),
        totalPages: Math.ceil(this.totalItems() / this.limit()),
    }));

    change = effect(() => {
        console.log('Pagination changed', this.pagination());
    });

    moveTo(move: number) {
        this.current.update((curr) => {
            const newValue = curr + move;
            if (newValue < 0 || newValue >= this.limit()) {
                console.log("not supported");
                return curr;
            }
            return newValue;
        });
    }
}
