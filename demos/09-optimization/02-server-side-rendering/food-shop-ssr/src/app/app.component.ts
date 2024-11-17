import { Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { foodStore } from './food/food.store';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    RouterOutlet,
    MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'food-shop-ssr';
  store = inject(foodStore);
  platformId = inject(PLATFORM_ID)
  cartPersisted = this.store.persistCart();

  toggleCartPersisted() {
    this.store.togglePersistence();
  }

  setCartPersistance = effect(
    () => {
      if (isPlatformBrowser(this.platformId)) {
        const persist = this.store.persistCart();
        if (persist) {
          localStorage.setItem('foodState', JSON.stringify(this.store.cart()));
        } else {
          localStorage.removeItem('foodState');
        }
      }
    }
  );
}
