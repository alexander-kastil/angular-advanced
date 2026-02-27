import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DemoItem } from '../demo-container/demo-item.model';

@Injectable({ providedIn: 'root' })
export class DemoService {
    private demos: DemoItem[] = [
        {
            id: 1,
            url: 'imperative',
            title: 'Imperative Reactivity',
            teaches: 'Understand the limitations of imperative programming',
            sortOrder: 1,
            topic: 'Reactive Fundamentals',
            visible: true
        },
        {
            id: 2,
            url: 'reactive',
            title: 'Declarative Reactivity',
            teaches: 'Transition to declarative reactive programming',
            sortOrder: 2,
            topic: 'Reactive Fundamentals',
            visible: true
        },
        {
            id: 3,
            url: 'async-pipe',
            title: 'Async Pipe',
            teaches: 'Use the async pipe to subscribe to Observables',
            sortOrder: 3,
            topic: 'Reactive Fundamentals',
            visible: true
        },
    ];

    getItems(): Observable<DemoItem[]> {
        return of(this.demos);
    }
}
