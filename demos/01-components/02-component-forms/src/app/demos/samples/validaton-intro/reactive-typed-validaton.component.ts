import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-typed-validation',
  templateUrl: './reactive-typed-validation.component.html',
  styleUrls: ['./reactive-typed-validation.component.scss'],
})
export class ReactiveTypedValidationComponent {
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        nonNullable: true,
      }),
      passwordRepeat: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    },
    {
      updateOn: 'blur',
      validators: [this.passwordsMatchValidator],
    }
  );

  registerUser(form: FormGroup) {
    const usr = {
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    };
    console.log('User to register: ', usr);
    console.log('Form: ', form);
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pwd = control.get('password')?.value;
    const repeat = control.get('passwordRepeat')?.value;
    return pwd && repeat && pwd === repeat ? null : { passwordMismatch: true };
  }
}
