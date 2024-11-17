import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FoodService } from '../food.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FoodItem } from '../food.model';

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  providers: [FoodService],
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent {
  id = input.required<number>();
  route = inject(ActivatedRoute);
  foodService = inject(FoodService);
  item = signal({ id: 0, name: '', price: 0, description: '', inStock: 0, pictureUrl: '' } as FoodItem);

  fetchItem = effect(
    () => {
      const id = Number(this.id());
      this.foodService.getFoodById(id).subscribe((item: FoodItem) => {
        this.item.set(item);
      });
    }
  );
}
