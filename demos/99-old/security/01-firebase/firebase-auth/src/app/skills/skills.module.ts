import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SkillsRoutingModule } from './skills-routing.module';

import { SkillsListComponent } from './skills-list/skills-list.component';
import { SkillRowComponent } from './skill-row/skill-row.component';
import { SkillsEditComponent } from './skills-edit/skills-edit.component';

@NgModule({ imports: [CommonModule,
        FormsModule,
        SkillsRoutingModule,
        SkillsListComponent, SkillRowComponent, SkillsEditComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SkillsModule {}
