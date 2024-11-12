import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  private breakpointObserver = inject(BreakpointObserver);

  private visible = signal(true);
  private position = signal<MatDrawerMode>('side');

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        tap((matchesBreakpoint) => {
          this.visible.set(matchesBreakpoint.matches ? false : true);
          this.position.set(matchesBreakpoint.matches ? 'over' : 'side');
        })
      ).subscribe();
  }

  getSideNavVisible() {
    return this.visible.asReadonly();
  }

  getSideNavPosition() {
    return this.position.asReadonly();
  }

  toggleMenuVisibility() {
    this.visible.set(!this.visible());
  }
}
