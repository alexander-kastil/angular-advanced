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
                return {
                    ...state,
                    cart: [...state.cart, item]
                };
            });
        },
        removeFromCart: (item: FoodCartItem) => {
            patchState(store, state => {
                return {
                    ...state,
                    cart: state.cart.filter(cartItem => cartItem.id !== item.id)
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