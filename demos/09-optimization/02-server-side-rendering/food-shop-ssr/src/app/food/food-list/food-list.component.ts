import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../food.service';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { FoodCartItem } from '../shop-item/food-cart-item.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, ShopItemComponent],
  providers: [FoodService],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent {
  foodService = inject(FoodService);
  food = toSignal(this.foodService.getFood());
  cart: FoodCartItem[] = []

  updateCart(cartItem: any) {
    console.log("updateCart: ", cartItem);
  }
}
