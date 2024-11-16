import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RendererStateService } from '../markdown-renderer/renderer-state.service';
import { SideNavService } from '../sidenav/sidenav.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { SidePanelComponent } from './side-panel.component';
import { SidePanelService } from './sidepanel.service';

describe('SidePanelComponent', () => {
    let component: SidePanelComponent;
    let fixture: ComponentFixture<SidePanelComponent>;
    let sidePanelService: jasmine.SpyObj<SidePanelService>;
    let sideNavService: jasmine.SpyObj<SideNavService>;
    let rendererState: jasmine.SpyObj<RendererStateService>;

    beforeEach(async () => {
        const sidePanelServiceSpy = jasmine.createSpyObj('SidePanelService', ['getEditorVisible', 'toggleEditorVisibility']);
        const sideNavServiceSpy = jasmine.createSpyObj('SideNavService', ['toggleMenuVisibility']);
        const rendererStateSpy = jasmine.createSpyObj('RendererStateService', ['toggleVisibility']);

        await TestBed.configureTestingModule({
            imports: [
                MatToolbar,
                MatToolbarRow,
                MatMiniFabButton,
                MatIcon,
                MatTooltipModule
            ],
            providers: [
                { provide: SnackbarService, useValue: {} },
                { provide: SidePanelService, useValue: sidePanelServiceSpy },
                { provide: SideNavService, useValue: sideNavServiceSpy },
                { provide: RendererStateService, useValue: rendererStateSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SidePanelComponent);
        component = fixture.componentInstance;
        sidePanelService = TestBed.inject(SidePanelService) as jasmine.SpyObj<SidePanelService>;
        sideNavService = TestBed.inject(SideNavService) as jasmine.SpyObj<SideNavService>;
        rendererState = TestBed.inject(RendererStateService) as jasmine.SpyObj<RendererStateService>;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle editor visibility', () => {
        sidePanelService.getEditorVisible.and.returnValue(signal(true));
        component.toggleEditor();
        expect(sidePanelService.toggleEditorVisibility).toHaveBeenCalled();
        expect(component.icon).toBe('close');
    });

    it('should toggle side nav visibility', () => {
        component.toggleSideNav();
        expect(sideNavService.toggleMenuVisibility).toHaveBeenCalled();
    });

    it('should toggle info visibility', () => {
        component.toggleInfo();
        expect(rendererState.toggleVisibility).toHaveBeenCalled();
    });

    it('should handle keyboard event', () => {
        const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'i' });
        spyOn(event, 'preventDefault');
        component.handleKeyboardEvent(event);
        expect(rendererState.toggleVisibility).toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
    });
});