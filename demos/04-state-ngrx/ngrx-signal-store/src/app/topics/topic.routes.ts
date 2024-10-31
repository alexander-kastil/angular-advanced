import { Routes } from '@angular/router';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicEditComponent } from './topic-edit/topic-edit.component';

export const topicRoutes: Routes = [
    {
        path: '',
        component: TopicListComponent
    },
    {
        path: ':id',
        component: TopicEditComponent,
    }
];