import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncRequestsComponent } from './async-requests.component';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMarkdown } from 'ngx-markdown';

describe('AsyncRequestsComponent', () => {
  let component: AsyncRequestsComponent;
  let fixture: ComponentFixture<AsyncRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AsyncRequestsComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideMarkdown()
      ]
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
