import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatestWith, map } from 'rxjs/operators';
import { LoginCredentials } from '../../credential.model';
import { AuthFacade } from '../../state/auth.facade';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatInput,
        MatError,
        MatCardActions,
        MatButton,
    ],
})
export class LoginComponent {
  @ViewChild('dialog') template!: TemplateRef<any>;
  af = inject(AuthFacade);
  dialog = inject(MatDialog);
  router = inject(Router);

  ngAfterViewInit() {
    this.dialog
      .open(this.template, { width: '350px' })
      .afterClosed()
      .pipe(
        combineLatestWith(this.af.isAuthenticated()),
        map(([close, isAuthenticated]) => {
          if (isAuthenticated) {
            this.router.navigate(['demos']);
          } else {
            this.router.navigate(['/']);
          }
        })
      )
      .subscribe();
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  logIn(form: FormGroup) {
    let vm: LoginCredentials = form.value;
    this.af.signIn(vm);
    this.dialog.closeAll();
  }
}
