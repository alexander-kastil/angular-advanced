import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockSignalsStoreComponent } from './mock-signals-store.component';

describe('MockSignalsStoreComponent', () => {
  let component: MockSignalsStoreComponent;
  let fixture: ComponentFixture<MockSignalsStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockSignalsStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockSignalsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
