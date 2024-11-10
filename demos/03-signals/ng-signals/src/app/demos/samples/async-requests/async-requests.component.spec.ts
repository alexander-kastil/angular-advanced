import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncRequestsComponent } from './async-requests.component';

describe('AsyncRequestsComponent', () => {
  let component: AsyncRequestsComponent;
  let fixture: ComponentFixture<AsyncRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsyncRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
