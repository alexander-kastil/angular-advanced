import { Component, effect, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { BoxedDirective } from '../../../shared/formatting/formatting-directives';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { Skill } from '../../../skills/skill.model';
import { SkillsService } from '../../../skills/skills.service';
@Component({
  selector: 'app-signal-effects',
  imports: [MatFormField, MatLabel, MatSelectModule, MarkdownRendererComponent, BoxedDirective],
  templateUrl: './signal-effects.component.html',
  styleUrl: './signal-effects.component.scss'
})
export class SignalEffectsComponent {
  service = inject(SkillsService);
  options = ['Completed', 'Open'];
  completedFilter = signal<boolean | undefined>(undefined);
  skills = signal<Skill[]>([]);

  // This effect will run whenever the completed signal changes
  // Using the option to defining the effect as a field / property of a class
  completedEffect = effect(() => {
    const filter = this.completedFilter();
    console.log('completed changed', filter);
    if (filter !== undefined) {
      this.service.getSkillsByCompletion(filter).subscribe(skills => {
        this.skills.set(skills);
      });
    }
  });

  onStatusChange(parm: MatSelectChange) {
    this.completedFilter.set(parm.value);
  }
}
