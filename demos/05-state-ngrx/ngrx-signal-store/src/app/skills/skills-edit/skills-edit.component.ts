import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { Skill } from '../skill.model';
import { SkillsEntityService } from '../skills-entity.service';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatFormField, MatLabel, MatInput, MatButtonModule,
    FormField, MatSlideToggle, MatCardActions]
})
export class SkillsEditComponent {
  readonly id = input('');
  router = inject(Router);
  service = inject(SkillsEntityService);
  sns = inject(SnackbarService);

  skillModel = signal<Skill>({ id: 0, name: '', completed: false });

  skillForm = form(this.skillModel, (s) => {
    required(s.name, { message: 'Name is required' });
  });

  get isNew() { return this.id() === 'new' || this.id() === ''; }

  constructor() {
    effect(() => {
      const id = Number(this.id());
      if (!this.isNew && id > 0) {
        this.service.getSkillById(id).subscribe((data) => {
          if (data) this.skillModel.set(data);
        });
      }
    });
  }

  saveSkill() {
    submit(this.skillForm, async () => {
      const skill = this.skillModel();
      const op$ = this.isNew ? this.service.add(skill) : this.service.update(skill);
      await firstValueFrom(op$);
      this.sns.displayAlert('Skills', this.isNew ? 'Skill added' : 'Skill updated');
      this.router.navigate(['/skills']);
    });
  }

  doCancel() {
    this.router.navigate(['/skills']);
  }
}
