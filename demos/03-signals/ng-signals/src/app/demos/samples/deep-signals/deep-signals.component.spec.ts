import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepSignalsComponent } from './deep-signals.component';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMarkdown } from 'ngx-markdown';

describe('DeepSignalsComponent', () => {
  let component: DeepSignalsComponent;
  let fixture: ComponentFixture<DeepSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeepSignalsComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideMarkdown()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeepSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize signals correctly', () => {
    expect(component.limit()).toBe(10);
    expect(component.current()).toBe(0);
    expect(component.totalItems()).toBe(100);
  });

  it('should compute pagination correctly', () => {
    const pagination = component.pagination();
    expect(pagination.currentPage).toBe(0);
    expect(pagination.pageSize).toBe(10);
    expect(pagination.totalPages).toBe(10);
  });

  it('should move to the next page correctly', () => {
    component.moveTo(1);
    expect(component.current()).toBe(1);
  });

  it('should not move to a negative page', () => {
    component.moveTo(-1);
    expect(component.current()).toBe(0);
  });

  it('should not move beyond the limit', () => {
    component.moveTo(10);
    expect(component.current()).toBe(0);
  });
});
