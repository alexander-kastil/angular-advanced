import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  SimpleChanges,
  input,
  output
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Skill } from '../skill.model';

@Component({
  selector: 'app-skill-row',
  templateUrl: './skill-row.component.html',
  styleUrls: ['./skill-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatIcon,
  ],
})
export class SkillRowComponent {
  skill = input.required<Skill>();
  itemDeleted = output<Skill>();
  itemCompleted = output<Skill>();

  deleteItem(item: Skill): void {
    this.itemDeleted.emit(item);
  }

  toggleItemCompleted(item: Skill): void {
    this.itemCompleted.emit(item);
  }
}
