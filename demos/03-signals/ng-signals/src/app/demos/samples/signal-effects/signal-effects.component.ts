import { Component, effect, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { BoxedDirective } from 'src/app/shared/formatting/formatting-directives';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { SkillsService } from 'src/app/skills/skills.service';
import { Skill } from 'src/app/skills/skill.model';
@Component({
  selector: 'app-signal-effects',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelectModule, MarkdownRendererComponent, BoxedDirective],
  templateUrl: './signal-effects.component.html',
  styleUrl: './signal-effects.component.scss'
})
export class SignalEffectsComponent {
  service = inject(SkillsService);
  options = ['Completed', 'Open'];
  completed = signal<boolean | undefined>(undefined);
  skills = signal<Skill[]>([]);

  // This effect will run whenever the completed signal changes
  // Using the option to defining the effect as a field / property of a class
  completedEffect = effect(() => {
    const completed = this.completed();
    console.log('completed changed', completed);
    if (completed !== undefined) {
      this.service.getSkillsByCompletion(completed).subscribe(skills => {
        this.skills.set(skills);
      });
    }
  });

  onStatusChange(parm: MatSelectChange) {
    this.completed.set(parm.value);
  }
}
