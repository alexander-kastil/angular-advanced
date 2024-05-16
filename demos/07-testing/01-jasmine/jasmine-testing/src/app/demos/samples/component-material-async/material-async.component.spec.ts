import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MaterialAsyncComponent } from './material-async.component';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MaterialAsyncComponent', () => {
  let fixture: ComponentFixture<MaterialAsyncComponent>;
  let component: MaterialAsyncComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          MaterialAsyncComponent,
          MarkdownModule.forRoot(),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 tags', () => {
    fixture.detectChanges();
    let tags = fixture.nativeElement.querySelectorAll('.mat-mdc-tab');
    expect(tags.length).toBe(3);
  });
})
