import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavItem } from '../navbar/navitem.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  http = inject(HttpClient);
  breakpointObserver = inject(BreakpointObserver);
  private visible = signal(true);
  private position = signal<MatDrawerMode>('side');
  readonly sideNavVisible = this.visible.asReadonly();
  readonly sideNavPosition = this.position.asReadonly();

  private topItemsSignal = toSignal(
    this.http.get<NavItem[]>(`${environment.api}top-links`),
    { initialValue: [] }
  );

  constructor() {
    effect(() => {
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .subscribe((matchesBreakpoint) => {
          console.log(matchesBreakpoint);
          this.visible.set(!matchesBreakpoint.matches);
          this.position.set(matchesBreakpoint.matches ? 'over' : 'side');
        });
    }, { allowSignalWrites: true });
  }

  getSideNavVisible() {
    return this.sideNavVisible;
  }

  getSideNavPosition() {
    return this.sideNavPosition;
  }

  setSideNavEnabled(val: boolean) {
    this.visible.set(val);
  }

  toggleMenuVisibility() {
    this.visible.update(v => !v);
  }

  getTopItems() {
    return this.topItemsSignal;
  }
}
