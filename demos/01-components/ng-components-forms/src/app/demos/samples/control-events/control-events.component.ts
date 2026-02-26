import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ControlEvent, FormControl, PristineChangeEvent, ReactiveFormsModule, StatusChangeEvent, TouchedChangeEvent, Validators, ValueChangeEvent } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MarkdownRendererComponent } from 'src/app/shared/markdown-renderer/markdown-renderer.component';
import { BoxedDirective } from '../../../shared/ux-lib/formatting/formatting-directives';

@Component({
  selector: 'app-control-events',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MarkdownRendererComponent,
    BoxedDirective
  ],
  templateUrl: './control-events.component.html',
  styleUrl: './control-events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlEventsComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  name = new FormControl(
    '',
    [Validators.required, Validators.minLength(3)],
    []
  );

  events: Map<string, any> = new Map();

  ngOnInit() {
    this.name.events.subscribe((event: ControlEvent) => {
      console.log('Form event:', event);
      if (event instanceof ValueChangeEvent) {
        this.events.set('ValueChangeEvent', event.value);
      }
      if (event instanceof StatusChangeEvent) {
        this.events.set('StatusChangeEvent', event.status);
      }
      if (event instanceof TouchedChangeEvent) {
        this.events.set('TouchedChangeEvent', event.touched);
      }
      if (event instanceof PristineChangeEvent) {
        this.events.set('PristineChangeEvent', event.pristine);
      }
      this.cdr.markForCheck();
    }
    );
  }
}
