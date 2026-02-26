import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  getTopItems(): Observable<NavItem[]> {
    return this.http.get<NavItem[]>(`${environment.api}top-links`);
  }
}
