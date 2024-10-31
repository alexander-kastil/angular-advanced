In this demo the Classic NgRx `AppState` is replaced with as state using `signalStore`. Note that it will not be persisted. For simplicity we have removed the auth-flag and for clarity we have renamed the file to `sidenav.store.ts`. 

```typescript
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
    toggleSideNav() {
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
```

The response to a possible change in screen width is handled by `sidenav.service.ts` which will replace the facade and acts as a mediator between the store and the component. It is used in the following components:

- `demo-container.component.ts`
- `navbar.component.ts`
- `side-panel.component.ts`