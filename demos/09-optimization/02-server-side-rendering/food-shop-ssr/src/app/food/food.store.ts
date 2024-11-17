import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FoodCartItem } from './shop-item/food-cart-item.model';
import { FoodItem } from './food.model';
import { computed, inject } from '@angular/core';
import { FoodService } from './food.service';
import { pipe, switchMap } from 'rxjs';

const logError = (error: Error) => console.error("error: ", error);

type FoodState = {
    cart: FoodCartItem[];
};

export const initialFoodState: FoodState = {
    cart: []
};

export const foodStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialFoodState),
    withEntities<FoodItem>(),
    withMethods((store, service = inject(FoodService)) => ({
        fetchFood: rxMethod<void>(
            pipe(
                switchMap(() => {
                    return service.getFood().pipe(
                        tapResponse({
                            next: (demos) => patchState(store, setEntities(demos)),
                            error: logError,
                            finalize: () => { }
                        }),
                    )
                })
            )
        ),
        addToCart: (item: FoodCartItem) => {
            patchState(store, state => {
                const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
                if (existingItem) {
                    return {
                        ...state,
                        cart: state.cart.map(cartItem =>
                            cartItem.id === item.id
                                ? { ...cartItem, quantity: item.quantity }
                                : cartItem
                        )
                    };
                }
                return {
                    ...state,
                    cart: [...state.cart, item]
                };
            });
        },
        removeFromCart: (item: FoodCartItem) => {
            patchState(store, state => {
                const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
                if (!existingItem) return state;

                const newQuantity = Math.max(0, existingItem.quantity - item.quantity);

                if (newQuantity === 0) {
                    return {
                        ...state,
                        cart: state.cart.filter(cartItem => cartItem.id !== item.id)
                    };
                }

                return {
                    ...state,
                    cart: state.cart.map(cartItem =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                    )
                };
            });
        }
    })),
    withComputed(({ cart }) => ({
        cartItems: computed(() => cart.length)
    })),
    withHooks({
        onInit({ fetchFood }) {
            fetchFood();
        }
    })
);