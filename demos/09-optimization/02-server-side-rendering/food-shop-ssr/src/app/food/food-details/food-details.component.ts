import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FoodService } from '../food.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  item = toSignal(this.foodService.getFoodById(this.id()));

  // item = this.route.paramMap.pipe(
  //   switchMap(params => {
  //     const id = Number(params.get('id'));
  //     return this.foodService.getFoodById(id);
  //   })
  // );
}
