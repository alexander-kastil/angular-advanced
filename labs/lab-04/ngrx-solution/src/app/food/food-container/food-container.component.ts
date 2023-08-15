import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FoodItem } from 'src/app/food/food.model';
import { FoodEditComponent } from '../food-edit/food-edit.component';
import { FoodListComponent } from '../food-list/food-list.component';
import { FoodService } from '../food.service';
import { FoodEntityService } from '../state/food-entity.service';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    FoodListComponent,
    NgIf,
    FoodEditComponent,
    AsyncPipe
  ],
})
export class FoodContainerComponent implements OnInit {
  fs = inject(FoodEntityService);
  food = this.fs.entities$;
  selected: FoodItem | undefined = undefined;

  ngOnInit(): void {
    this.fs.getAll();
  }

  selectFood(f: FoodItem) {
    this.selected = { ...f };
  }

  addFood() {
    this.selected = new FoodItem();
  }

  saveFood(f: FoodItem) {
    // let arr = [...this.food]

    // if (f.id == 0) {
    //   this.fs.addFood(f).subscribe((food) => {
    //     arr.push(food);
    //     this.food = arr;
    //     this.selected = undefined;
    //   });
    // } else {
    //   this.fs.updateFood(f).subscribe((food) => {
    //     const index = arr.findIndex((f) => f.id === food.id);
    //     arr[index] = food;
    //     this.food = arr;
    //     this.selected = undefined;
    //   });
    // }
  }
}
