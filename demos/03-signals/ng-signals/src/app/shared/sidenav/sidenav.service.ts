import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { httpResource } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { tap } from 'rxjs/operators';
import { NavItem } from '../navbar/navitem.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  breakpointObserver = inject(BreakpointObserver);
  private visible = signal(true);
  private position = signal<MatDrawerMode>('side');
  readonly sideNavVisible = this.visible.asReadonly();
  readonly sideNavPosition = this.position.asReadonly();

  topItems = httpResource<NavItem[]>(() => `${environment.api}top-links`);

  constructor() {
    this.watchScreen.subscribe();
  }

  getSideNavVisible() {
    return this.sideNavVisible;
  }

  getSideNavPosition() {
    return this.sideNavPosition;
  }

  watchScreen = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      tap((matchesBreakpoint) => {
        console.log(matchesBreakpoint);
        this.visible.set(!matchesBreakpoint.matches);
        this.position.set(matchesBreakpoint.matches ? 'over' : 'side');
      })
    );

  setSideNavEnabled(val: boolean) {
    this.visible.set(val);
  }

  toggleMenuVisibility() {
    this.visible.update(v => !v);
  }
}
