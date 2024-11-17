import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EuroPipe } from '../../shared/euro.pipe';
import { NumberPickerComponent } from '../../shared/number-picker/number-picker.component';
import { FoodItem } from '../food.model';
import { FoodCartItem } from './food-cart-item.model';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    NgOptimizedImage,
    EuroPipe,
    NumberPickerComponent
  ]
})
export class ShopItemComponent {
  food = input.required<FoodItem>();
  inCart = input<number>(0);
  itemChanged = output<FoodCartItem>();

  nbrPicker: FormControl = new FormControl(0);

  ngOnChanges() {
    this.nbrPicker.setValue(this.inCart);
  }

  handleAmountChange(amount: any) {
    const item: FoodCartItem = { ...this.food(), quantity: amount };
    this.itemChanged.emit(item);
  }
}
