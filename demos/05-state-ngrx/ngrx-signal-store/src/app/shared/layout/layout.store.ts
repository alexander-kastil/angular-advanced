import { computed, effect } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

export type MarkdownMode = 'guide' | 'editor';

type LayoutState = {
    markdownPaneVisible: boolean;
    markdownMode: MarkdownMode;
    sidenavVisible: boolean;
    sidenavPosition: MatDrawerMode;
};

const STORAGE_KEY = 'layout-state';

function loadFromStorage(): Partial<LayoutState> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

const defaults: LayoutState = {
    markdownPaneVisible: true,
    markdownMode: 'guide',
    sidenavVisible: true,
    sidenavPosition: 'side',
};

export const LayoutStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(defaults),
    withComputed(({ markdownPaneVisible, markdownMode }) => ({
        isGuideActive: computed(() => markdownPaneVisible() && markdownMode() === 'guide'),
        isEditorActive: computed(() => markdownPaneVisible() && markdownMode() === 'editor'),
    })),
    withMethods((store) => ({
        showGuide() {
            if (store.markdownPaneVisible() && store.markdownMode() === 'guide') {
                patchState(store, { markdownPaneVisible: false });
            } else {
                patchState(store, { markdownPaneVisible: true, markdownMode: 'guide' });
            }
        },
        showEditor() {
            patchState(store, { markdownMode: 'editor' });
        },
        toggleSidenavVisible() {
            patchState(store, { sidenavVisible: !store.sidenavVisible() });
        },
        setSidenavVisible(visible: boolean) {
            patchState(store, { sidenavVisible: visible });
        },
        setSidenavPosition(position: MatDrawerMode) {
            patchState(store, { sidenavPosition: position });
        },
    })),
    withHooks({
        onInit(store) {
            const saved = loadFromStorage();
            if (Object.keys(saved).length > 0) {
                patchState(store, saved);
            }
            effect(() => {
                const state = getState(store);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            });
        },
    }),
);
