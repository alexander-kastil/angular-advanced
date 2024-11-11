import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavItem } from '../navbar/navitem.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  http = inject(HttpClient);
  breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.watchScreen.subscribe();
  }

  visible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  position$: BehaviorSubject<MatDrawerMode> = new BehaviorSubject<MatDrawerMode>('side');

  getSideNavVisible() {
    return this.visible$.asObservable();
  }

  getSideNavPosition() {
    return this.position$.asObservable();
  }

  watchScreen = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      tap((matchesBreakpoint) => {
        console.log(matchesBreakpoint);
        this.visible$.next(matchesBreakpoint.matches ? false : true);
        this.position$.next(matchesBreakpoint.matches ? 'over' : 'side');
      })
    );

  adjustSidenavToScreen(mq: string): boolean {
    return mq == 'xs' ? false : true;
  }

  toggleMenuVisibility() {
    let status = !this.visible$.getValue();
    this.visible$.next(status);
  }

  getTopItems(): Observable<NavItem[]> {
    return this.http.get<NavItem[]>(`${environment.api}top-links`);
  }
}
