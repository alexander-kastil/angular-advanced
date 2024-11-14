import { TestBed } from '@angular/core/testing';
import { sideNavStore } from './sidenav.store';

describe('SideNavStore', () => {

    let store: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [sideNavStore],
        });
        store = TestBed.inject(sideNavStore);
    });


    it('should have a default value', () => {
        expect(store.sideNavVisible()).toBe(true);
    });

    it('should set the value on toggle', () => {
        store.toggleSideNav();
        expect(store.sideNavVisible()).toBe(false);
    });

    it('should set the value on show', () => {
        store.changeSideNavVisible(false);
        store.changeSideNavVisible(true);
        expect(store.sideNavVisible()).toBe(true);
    });
});