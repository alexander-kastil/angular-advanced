import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DemoItem } from '../../demo-base/demo-item.model';
import { getAllDemos } from '../../state/demo.selectors';
import { DemoActions } from '../../state/demos.actions';
import { DemoState } from '../../state/demos.reducer';
import { DemoRowComponent } from '../demo-row/demo-row.component';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-demo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    CdkDropList,
    DemoRowComponent,
    CdkDrag,
  ],
})
export class DemoListComponent {
  private store = inject(Store<DemoState>);

  demos = this.store.selectSignal(getAllDemos);

  drop(event: CdkDragDrop<DemoItem[]>) {
    const arr = [...this.demos()];
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.changeSortOrder(arr);
  }

  // Actually you should implement this using an action :-)
  changeSortOrder(arr: DemoItem[]) {
    let idx = 0;
    arr.forEach((item) => {
      item.sortOrder = idx;
      idx++;
    });
  }

  deleteItem(item: DemoItem) {
    console.log('deleting item', item);
  }

  selectItem(item: DemoItem) {
    this.store.dispatch(DemoActions.setSelected({ item }));
  }
}
