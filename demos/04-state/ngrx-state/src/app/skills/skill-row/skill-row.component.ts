import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Skill } from '../skill.model';

@Component({
  selector: 'app-skill-row',
  templateUrl: './skill-row.component.html',
  styleUrls: ['./skill-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillRowComponent {
  @Input() skill: Skill = new Skill();
  @Output() itemDeleted: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() itemCompleted: EventEmitter<Skill> = new EventEmitter<Skill>();

  ngDoCheck(): void {
    if (environment.logChangeDetection) {
      console.log(`SkillRowComponent - ngDoCheck: ${this.skill.name}`);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (environment.logChanges) {
      console.log(`SkillRowComponent - ngOnChanges: ${this.skill.name}`);
    }
  }

  deleteItem(item: Skill): void {
    this.itemDeleted.emit(item);
  }

  toggleItemCompleted(item: Skill): void {
    this.itemCompleted.emit(item);
  }
}
