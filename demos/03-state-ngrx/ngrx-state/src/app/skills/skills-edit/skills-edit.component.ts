import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../skill.model';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-skills-edit',
    templateUrl: './skills-edit.component.html',
    styleUrls: ['./skills-edit.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggle,
        MatCardActions,
        MatButton,
    ],
})
export class SkillsEditComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  sns = inject(SnackbarService);
  skill: Skill = new Skill();

  ngOnInit(): void {
    this.readParamUsingSnapshot();
    // this.readParamUsingParamMap();
    // this.readParamUsingResolver();
    // this.readParamUsingResolverObs();
  }

  getSkill(id: number) {
    // this.service.getSkill(id).subscribe((data) => {
    //   if (data) {
    //     this.skill = data;
    //     console.log('setting skill: ', data);
    //   }
    // });
  }

  /* #region params */

  readParamUsingSnapshot() {
    // id param
    const id = this.route.snapshot.params['id'];
    this.getSkill(id);
    // query params
    const readonly = this.route.snapshot.queryParams['readonly'];
    if (readonly != null) {
      console.log(`Page is readonly: ${readonly}`);
    }
    // fragments
    const fragments = this.route.snapshot.fragment;
    if (fragments != undefined) {
      console.log(`Section to navigate to: ${fragments}`);
    }
    //state
    const state = history.state.data;
    if (state != null) {
      console.log('state: ', state);
    }
  }

  readParamUsingParamMap() {
    // id param
    this.route.paramMap.subscribe((params) => {
      console.log('paramMap:', params);
    });
    // query params
    this.route.queryParamMap.subscribe((qpm) => {
      console.log('paramMap:', qpm);
      const readonly = qpm.get('readonly') === 'true';
    });
    // fragments
    this.route.fragment.subscribe((fr) => {
      console.log('paramMap:', fr);
      const fragment = fr;
    });
  }

  readParamUsingResolver() {
    this.skill = this.route.snapshot.data['skillData'];
  }

  readParamUsingResolverObs() {
    this.route.data.subscribe((data) => {
      this.skill = data['skillData'];
    });
  }

  /* #endregion */

  saveSkill() {
    this.sns.displayAlert('Warning', 'Save not implemented');
  }

  doCancel() {
    this.router.navigate(['/skills']);
  }
}
