import { Component, OnChanges, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { Skill } from '../skill.model';
import { SkillsEntityService } from '../skills-entity.service';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.scss'],
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatButtonModule,
    FormsModule,
    MatSlideToggle,
    MatCardActions,
  ]
})
export class SkillsEditComponent implements OnChanges {
  id = input.required<number>();
  router = inject(Router);
  service = inject(SkillsEntityService);
  sns = inject(SnackbarService);

  skill = signal<Skill>(new Skill());

  ngOnChanges(): void {
    if (this.id() !== 0) {
      this.service.getSkillById(this.id()).subscribe((data) => {
        if (data) {
          this.skill.set(data);
        }
      });
    }
  }

  saveSkill() {
    this.service.upsert(this.skill()).subscribe(() => {
      this.router.navigate(['/skills']);
    });
  }

  updateName(value: string) {
    this.skill.update(s => ({ ...s, name: value }));
  }

  updateCompleted(value: boolean) {
    this.skill.update(s => ({ ...s, completed: value }));
  }

  doCancel() {
    this.router.navigate(['/skills']);
  }
}
