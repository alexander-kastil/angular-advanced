import { TestBed } from '@angular/core/testing';
import { SidePanelService } from './sidepanel.service';

describe('SidePanelService', () => {
    let service: SidePanelService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SidePanelService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return initial visibility as false', () => {
        const visibility = service.getEditorVisible();
        expect(visibility()).toBeFalse();
    });

    it('should toggle visibility', () => {
        service.toggleEditorVisibility();
        expect(service.getEditorVisible()()).toBeTrue();

        service.toggleEditorVisibility();
        expect(service.getEditorVisible()()).toBeFalse();
    });
});