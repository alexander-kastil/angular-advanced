import { AsyncPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { BorderDirective, CenteredDirective } from 'src/app/shared/formatting/formatting-directives';
import { MarkdownRendererModule } from 'src/app/shared/markdown-renderer/markdown-renderer.module';

@Component({
  selector: 'app-rxjs-interop',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MarkdownRendererModule,
    BorderDirective,
    CenteredDirective
  ],
  templateUrl: './rxjs-interop.component.html',
  styleUrl: './rxjs-interop.component.scss'
})
export class RxjsInteropComponent {
  amount$ = of(10);
  amount = toSignal(this.amount$, { initialValue: 10 });
  writeableAmount = signal(this.amount());

  // creates a writeable signal that is bound to the amount signal
  // an alternative could to subscribe the observable and create a writeable signal
  createWriteAmount = effect(() => {
    this.writeableAmount.set(this.amount());
  });

  updateAmount() {
    // this.amount.set(this.writeAmount());
    this.writeableAmount.update(curr => curr + 1);
  }
}