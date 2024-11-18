import { Component, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  imports: [MatIcon]
})
export class NumberPickerComponent {
  quantity = model(0);

  add(amount: number) {
    this.quantity.update((q) => q + amount);
  }
}
