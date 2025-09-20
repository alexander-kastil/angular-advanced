import { Component, inject } from '@angular/core';
import { FoodServiceDelay } from "./food-delay.service";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-food-menu',
    templateUrl: './food-menu.component.html',
    styleUrls: ['./food-menu.component.scss'],
    imports: [AsyncPipe]
})
export class FoodMenuComponent {
  fs = inject(FoodServiceDelay);
  food = this.fs.getFood();
}
