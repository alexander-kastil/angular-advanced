import { Component, inject } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { getRouterInfo } from '../../../../state/router.reducer';

@Component({
  selector: 'app-routing-target',
  templateUrl: './routing-target.component.html',
  styleUrls: ['./routing-target.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    AsyncPipe,
    JsonPipe,
  ],
})
export class RoutingTargetComponent {
  store = inject(Store) as Store<RouterReducerState>;
  routerState$ = this.store.select(getRouterInfo).pipe(tap(console.log));
}