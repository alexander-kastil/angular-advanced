import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { DemoItem } from '../../demo-base/demo-item.model';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-demo-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demo-row.component.html',
  styleUrls: ['./demo-row.component.scss'],
  standalone: true,
  imports: [
    MatSlideToggle,
    MatButton,
    MatIcon,
  ],
})
export class DemoRowComponent {
  item = input<DemoItem | null>(null);
  onDelete = output<DemoItem>();
  onSlide = output<DemoItem>();

  delete() {
    const item = this.item();
    if (item != null) this.onDelete.emit(item);
  }

  changeVisibility() {
    const item = this.item();
    if (item != null) {
      item.visible = !item.visible;
      this.onSlide.emit(item);
    }
  }
}
