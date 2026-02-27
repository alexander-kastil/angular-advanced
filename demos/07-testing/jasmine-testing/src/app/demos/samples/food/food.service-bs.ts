import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FoodItem } from './food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodServiceBS {
  http = inject(HttpClient);

  constructor() {
    this.http
      .get<FoodItem[]>(`${environment.api}food`)
      .subscribe((data) => {
        this.food.next(data);
      });
  }

  food: BehaviorSubject<FoodItem[]> = new BehaviorSubject<FoodItem[]>([]);

  getFood() {
    return this.food.asObservable();
  }

  deleteFood(item: FoodItem) {
    const filtered = this.food.value.filter((f: FoodItem) => !this.deepEqual(f, item));
    this.food.next(filtered);
    return of(true);
  }

  addFood(item: FoodItem) {
    let arr = this.food.value;
    arr.push(item);
    this.food.next(arr);
    return of(true);
  }

  deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!this.deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  }
}
