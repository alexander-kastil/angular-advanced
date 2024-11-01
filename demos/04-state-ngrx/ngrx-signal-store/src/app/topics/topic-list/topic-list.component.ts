import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { Topic } from '../topic.model';
import { topicsStore } from '../topics.store';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [MatTableModule, MatSlideToggleModule],
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  providers: [topicsStore]
})
export class TopicListComponent {
  store = inject(topicsStore);
  topics = this.store.entities;

  toggleCompleted(topic: Topic) {
    this.store.updateTopic({ ...topic, completed: !topic.completed });
  }
}
