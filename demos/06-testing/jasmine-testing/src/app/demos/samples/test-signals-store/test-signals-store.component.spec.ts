import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSignalsStoreComponent } from './test-signals-store.component';

describe('TestSignalsStoreComponent', () => {
  let component: TestSignalsStoreComponent;
  let fixture: ComponentFixture<TestSignalsStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSignalsStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSignalsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
