import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { BoxedDirective } from '../../../shared/ux-lib/formatting/formatting-directives';

@Component({
  selector: 'app-control-flow',
  imports: [
    MarkdownRendererComponent,
    MatSlideToggleModule,
    ReactiveFormsModule,
    BoxedDirective
  ],
  templateUrl: './control-flow.component.html',
  styleUrl: './control-flow.component.scss'
})
export class ControlFlowComponent {
  fcDisplay = new FormControl(true);
  dogs: string[] = []

  ngOnInit() {
    setTimeout(() => {
      this.dogs = ["Flora", "Cleo", "Soi", "Giro"]
    }, 5000);
  }
}
