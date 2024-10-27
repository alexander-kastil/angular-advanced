import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInputSignalsComponent } from './component-input-signals.component';

describe('ComponentInputSignalsComponent', () => {
  let component: ComponentInputSignalsComponent;
  let fixture: ComponentFixture<ComponentInputSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentInputSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentInputSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
