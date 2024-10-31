import { Component, signal, Signal } from '@angular/core';
import { Topic } from '../topic.model';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [MatTableModule, MatSlideToggleModule],
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent {

  topics: Signal<Topic[]>;

  constructor() {
    this.topics = signal<Topic[]>([]);
  }

  toggleCompleted(topic: Topic) {
    topic.completed = !topic.completed;
  }

}
