import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FoodItem } from '../../food/food.model';
import { FoodServiceBS } from '../../food/food.service-bs';
import { FoodRowComponent } from '../food-row/food-row.component';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-food-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.scss'],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        FoodRowComponent,
    ]
})
export class FoodListComponent implements OnInit {
  food: FoodItem[] = [];
  fs = inject(FoodServiceBS);

  ngOnInit() {
    this.fs.getFood().subscribe((data) => {
      this.food = data;
    });
  }

  deleteFood(food: FoodItem) {
    this.food = this.food.filter((i) => i != food);
    this.fs.deleteFood(food);
  }
}
