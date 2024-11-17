import { TestBed } from '@angular/core/testing';
import { foodStore } from './food.store';
import { FoodService } from './food.service';
import { of } from 'rxjs';
import { FoodItem } from './food.model';
import { FoodCartItem } from './shop-item/food-cart-item.model';

describe('FoodStore', () => {
    let store: typeof foodStore;
    let foodServiceSpy: jasmine.SpyObj<FoodService>;

    const mockFoodItems: FoodItem[] = [
        { id: '1', name: 'Pizza', price: 10, description: 'Tasty pizza' },
        { id: '2', name: 'Burger', price: 8, description: 'Juicy burger' }
    ];

    beforeEach(() => {
        foodServiceSpy = jasmine.createSpyObj('FoodService', ['getFood']);
        foodServiceSpy.getFood.and.returnValue(of(mockFoodItems));

        TestBed.configureTestingModule({
            providers: [
                { provide: FoodService, useValue: foodServiceSpy }
            ]
        });

        store = TestBed.inject(foodStore);
    });

    it('should fetch food items on init', () => {
        expect(foodServiceSpy.getFood).toHaveBeenCalled();
        expect(store.entities()).toEqual(mockFoodItems);
    });

    it('should add item to cart', () => {
        const cartItem: FoodCartItem = {
            id: '1',
            name: 'Pizza',
            price: 10,
            quantity: 2
        };

        store.addToCart(cartItem);
        expect(store.cart()).toContain(cartItem);
        expect(store.cartItems()).toBe(1);
    });

    it('should update quantity if item already exists in cart', () => {
        const cartItem: FoodCartItem = {
            id: '1',
            name: 'Pizza',
            price: 10,
            quantity: 2
        };

        store.addToCart(cartItem);
        store.addToCart({ ...cartItem, quantity: 3 });

        expect(store.cart()).toEqual([{ ...cartItem, quantity: 3 }]);
        expect(store.cartItems()).toBe(1);
    });

    it('should remove item from cart', () => {
        const cartItem: FoodCartItem = {
            id: '1',
            name: 'Pizza',
            price: 10,
            quantity: 2
        };

        store.addToCart(cartItem);
        store.removeFromCart(cartItem);

        expect(store.cart()).toEqual([]);
        expect(store.cartItems()).toBe(0);
    });

    it('should decrease quantity when removing items', () => {
        const cartItem: FoodCartItem = {
            id: '1',
            name: 'Pizza',
            price: 10,
            quantity: 3
        };

        store.addToCart(cartItem);
        store.removeFromCart({ ...cartItem, quantity: 1 });

        expect(store.cart()).toEqual([{ ...cartItem, quantity: 2 }]);
        expect(store.cartItems()).toBe(1);
    });
});