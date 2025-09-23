import { MatDrawerMode } from '@angular/material/sidenav';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type SideNavState = {
  sideNavVisible: boolean;
  sideNavPosition: MatDrawerMode;
}

const initialSideNavState: SideNavState = {
  sideNavVisible: true,
  sideNavPosition: 'side',
};

export const sideNavStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withState(initialSideNavState),
  withMethods((store) => ({
    toggleSideNavVisible() {
      patchState(store, { sideNavVisible: !store.sideNavVisible() });
    },
    changeSideNavVisible(visible: boolean) {
      patchState(store, { sideNavVisible: visible });
    },
    changeSideNavPosition(position: MatDrawerMode) {
      patchState(store, { sideNavPosition: position });
    }
  })),
);
