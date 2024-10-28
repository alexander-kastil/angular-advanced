import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
  inject
} from '@angular/core';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatFormField,
        MatInput,
        MatDialogActions,
        MatButton,
    ],
})
export class SignUpComponent implements AfterViewInit {
  router = inject(Router);
  dialog = inject(MatDialog);
  template = viewChild('dialog', { read: TemplateRef });

  ngAfterViewInit() {
    if (this.template()) {
      const ref = this.dialog.open(this.template(), {
        width: '350px',
      });

      ref.afterClosed().subscribe(() => {
        this.router.navigate(['demos']);
        this.dialog.closeAll();
      });
    }
  }
}
