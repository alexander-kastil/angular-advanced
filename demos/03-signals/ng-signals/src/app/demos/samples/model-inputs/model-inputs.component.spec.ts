import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelInputsComponent } from './model-inputs.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

describe('ModelInputsComponent', () => {
  let component: ModelInputsComponent;
  let fixture: ComponentFixture<ModelInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelInputsComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideMarkdown()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModelInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
