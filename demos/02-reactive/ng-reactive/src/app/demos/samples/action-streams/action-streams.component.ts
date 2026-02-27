import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';
import { BoxedDirective } from '../../../shared/ux-lib/formatting/formatting-directives';
import { DemoService } from '../../demo-shared/demo.service';

@Component({
  selector: 'app-action-streams',
  templateUrl: './action-streams.component.html',
  styleUrls: ['./action-streams.component.scss'],
  imports: [MatFormField, MatInput, FormsModule, ReactiveFormsModule, AsyncPipe, MarkdownRendererComponent, BoxedDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionStreamsComponent {
  ds = inject(DemoService);

  demos$ = this.ds.getItems();
  filter$ = new FormControl<string>('', { nonNullable: true });

  vm$ = combineLatest([
    this.demos$,
    this.filter$.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([demos, filter]) => {
      return filter == ''
        ? demos
        : demos.filter((d) =>
          d.title.toLowerCase().includes(filter.toLowerCase())
        );
    })
  );
}