import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Skill } from '../../skills/skills';
import { SkillsService } from '../../skills/skills.service';
import { JsonPipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';

@Component({
    selector: 'app-imperative',
    templateUrl: './imperative.component.html',
    styleUrls: ['./imperative.component.scss'],
    standalone: true,
    imports: [
        MarkdownRendererComponent,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        JsonPipe,
    ],
})
export class ImperativeComponent implements OnInit {
  @Input() title = 'ImperativeProgramming';
  @Input() showMD = true;

  filter$ = new FormControl('', { nonNullable: true });
  service = inject(SkillsService);
  //local vars for values taken out of the stream
  skills: Skill[] = [];
  view: Skill[] = [];

  //destroy$ is a Subject that will emit a value when the component is destroyed. Implemented in ngOnDestroy()
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.service
      .getSkills()
      //takeUntil will unsubscribe from the stream when the destroy$ Subject emits a value
      .pipe(takeUntil(this.destroy$))
      .subscribe((skills) => {
        this.skills = skills;
        this.view = skills;
      });

    this.filter$.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.view =
          val == ''
            ? this.skills
            : this.skills.filter((skill) => skill.name.includes(val));
      });
  }
}
