import { isPlatformBrowser } from '@angular/common';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { FoodItem } from './food.model';
import { FoodService } from './food.service';
import { FoodCartItem } from './shop-item/food-cart-item.model';

const logError = (error: Error) => console.error("error: ", error);

type FoodState = {
    cart: FoodCartItem[];
    persistCart: boolean;
};

export const initialFoodState: FoodState = {
    cart: [],
    persistCart: false
};

export const foodStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialFoodState),
    withEntities<FoodItem>(),
    withMethods((
        store,
        service = inject(FoodService),
        platformId = inject(PLATFORM_ID)) => ({
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
            },
            togglePersistence: () => {
                patchState(store, (state) => ({
                    ...state,
                    persistCart: !state.persistCart
                }));
            },
            checkPersistence: () => {
                if (isPlatformBrowser(platformId)) {
                    const storageState = JSON.parse(localStorage.getItem('foodState') || '{}') as FoodState;
                    if (storageState.persistCart) {
                        patchState(store, storageState);
                    }
                }
            },
        })),
    withComputed(({ cart }) => ({
        cartItems: computed(() => cart().reduce((acc, item) => acc + item.quantity, 0) || 0),
        cartTotal: computed(() => cart().reduce((acc, item) => acc + item.quantity * item.price, 0) || 0)
    })),
    withHooks({
        onInit({ fetchFood }) {
            fetchFood();
        }
    })
);