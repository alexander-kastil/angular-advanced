import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DemoItem } from '../../../demo-container/demo-item.model';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-demo-row',
  templateUrl: './demo-row.component.html',
  styleUrls: ['./demo-row.component.scss'],
  imports: [
    MatSlideToggle,
    MatButton,
    MatIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoRowComponent {
  item = input<DemoItem>(new DemoItem());
  onDelete = output<DemoItem>();
  onSelect = output<DemoItem>();
  onChangeVisibility = output<DemoItem>();

  delete() {
    this.onDelete.emit(this.item());
  }

  edit() {
    this.onSelect.emit(this.item());
  }

  changeVisibility() {
    const updated = { ...this.item(), visible: !this.item().visible };
    this.onChangeVisibility.emit(updated);
  }
}
