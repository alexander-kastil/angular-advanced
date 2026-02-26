import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillsService } from '../skills.service';
import { Skill } from '../skill.model';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  service = inject(SkillsService);
  skills = toSignal(this.service.getSkills());

  trackById(index: number, skill: Skill): number {
    return skill.id;
  }

  showSkill(skill: Skill) {
    console.log(`you selected${skill}`);
  }
}
