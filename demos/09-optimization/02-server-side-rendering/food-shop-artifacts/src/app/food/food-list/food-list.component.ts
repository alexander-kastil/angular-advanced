import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FoodService } from '../food.service';
import { foodStore } from '../food.store';
import { ShopItemComponent } from '../shop-item/shop-item.component';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, ShopItemComponent],
  providers: [FoodService],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent {
  store = inject(foodStore);
  food = this.store.entities;

  updateCart(cartItem: any) {
    this.store.addToCart(cartItem);
  }
}
