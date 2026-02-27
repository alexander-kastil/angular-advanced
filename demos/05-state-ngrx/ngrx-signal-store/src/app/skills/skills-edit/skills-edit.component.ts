import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { NonNullableFormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggle,
    MatCardActions,
  ]
})
export class SkillsEditComponent {
  readonly id = input(0);
  router = inject(Router);
  service = inject(SkillsEntityService);
  sns = inject(SnackbarService);
  fb = inject(NonNullableFormBuilder);

  skillForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    completed: false,
  });

  get isNew() { return Number(this.id()) === 0; }

  constructor() {
    effect(() => {
      const id = Number(this.id());
      if (id !== 0) {
        this.service.getSkillById(id).subscribe((data) => {
          if (data) this.skillForm.patchValue(data);
        });
      }
    });
  }

  saveSkill() {
    if (this.skillForm.invalid) return;
    const skill = this.skillForm.value as Skill;
    const op$ = this.isNew ? this.service.add(skill) : this.service.update(skill);
    op$.subscribe(() => {
      this.sns.displayAlert('Skills', this.isNew ? 'Skill added' : 'Skill updated');
      this.router.navigate(['/skills']);
    });
  }

  doCancel() {
    this.router.navigate(['/skills']);
  }
}
