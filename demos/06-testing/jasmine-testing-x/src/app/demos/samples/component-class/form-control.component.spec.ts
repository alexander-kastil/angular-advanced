
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControlComponent } from './form-control.component';

describe('FormControlComponent', () => {
    let component: FormControlComponent;
    let fixture: ComponentFixture<FormControlComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormControlComponent],
            imports: [
                ReactiveFormsModule,
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a valid name control initially', () => {
        expect(component.name.valid).toBeFalse();
    });

    it('should validate name control correctly', () => {
        component.name.setValue('Jo');
        expect(component.name.valid).toBeFalse();
        component.name.setValue('John');
        expect(component.name.valid).toBeTrue();
    });

    it('should log name value', () => {
        const consoleSpy = spyOn(console, 'log');
        component.logName();
        expect(consoleSpy).toHaveBeenCalledWith('current name:', component.name.value);
    });

    it('should update name value', () => {
        component.updateName();
        expect(component.name.value).toBe('Soi');
    });

    it('should subscribe to name value changes', () => {
        const consoleSpy = spyOn(console, 'log');
        component.name.setValue('New Name');
        expect(consoleSpy).toHaveBeenCalledWith('Form values changed', 'New Name');
    });

    it('should subscribe to name status changes', () => {
        const consoleSpy = spyOn(console, 'log');
        component.name.setValue('');
        expect(consoleSpy).toHaveBeenCalledWith('Form status changed', 'INVALID');
    });
});