import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { BorderDirective } from '../../../shared/ux-lib/formatting/formatting-directives';

@Component({
    selector: 'app-reactive-cascade',
    templateUrl: './reactive-cascade.component.html',
    styleUrls: ['./reactive-cascade.component.scss'],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatSelect,
        MatOption,
        MatButton,
        BorderDirective
    ]
})
export class ReactiveCascadeComponent {
  fb: FormBuilder = inject(FormBuilder);

  readonly selectValues = [
    {
      type: 'Frameworks',
      values: ['Angular', 'React', '.NET Core', 'Spring']
    },
    {
      type: 'Languages',
      values: ['TypeScript', 'JavaScript', 'C#', 'Java', 'Python'],
    },
    {
      type: 'Cloud',
      values: ['Azure', 'AWS', 'Google']
    },
  ];

  selects: string[] = [];

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    skills: this.fb.array([this.fb.nonNullable.group({
      techType: [''],
      techValues: [''],
    })]),
  });

  saveProfileForm() {
    console.log(this.profileForm.value);
  }

  getTechValuesCascade(type: any) {
    const select = this.selectValues.find((tech) => tech.type == type);
    return select ? select.values : select;
  }

  saveForm() {
    console.log('form saves:', this.profileForm);
  }

  addSkill() {
    this.profileForm.controls.skills.push(this.fb.nonNullable.group({
      techType: [''],
      techValues: [''],
    }));
  }
}
