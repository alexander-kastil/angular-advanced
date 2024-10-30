import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { sideNavStore } from './sidenav.store';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  navStore = inject(sideNavStore);
  breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        tap((matchesBreakpoints) => {
          console.log("matchesBreakpoint: ", matchesBreakpoints.matches);
          const position = matchesBreakpoints.matches ? 'over' : 'side';
          const visible = matchesBreakpoints.matches ? false : true;
          this.navStore.changeSideNavVisible(visible);
          this.navStore.changeSideNavPosition(position);
        })
      ).subscribe();
  }

  getSideNavVisible() {
    return this.navStore.sideNavVisible;
  }

  getSideNavPosition() {
    return this.navStore.sideNavPosition;
  }

  toggleMenuVisibility() {
    this.navStore.toggleSideNav();
  }
}
