import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { ComponentEventsComponent } from './component-events.component';

describe('ComponentEventsComponent', () => {
  let fixture: ComponentFixture<ComponentEventsComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MarkdownModule.forRoot()
      ],
      providers: [
        provideHttpClient()
      ]
    }).createComponent(ComponentEventsComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should increment the count - triggerEventHandler', () => {
    const btnClick = fixture.debugElement.query(By.css('[data-testid=btnIncrement]'));
    btnClick.triggerEventHandler('click', {});

    expect(fixture.componentInstance.count()).toBe(1);
    fixture.detectChanges();

    const divResult = fixture.debugElement.query(By.css('[data-testid=result]'));
    expect(divResult.nativeElement.innerText).toContain('1');
  });

  it('should increment the count - native Api', () => {
    const btnClick = fixture.debugElement.query(By.css('[data-testid=btnIncrement]'));
    btnClick.nativeElement.click();
    btnClick.nativeElement.click();

    expect(fixture.componentInstance.count()).toBe(2);
    fixture.autoDetectChanges();

    const divResult = fixture.debugElement.query(By.css('[data-testid=result]'));
    expect(divResult.nativeElement.innerText).toContain('2');
  });
});
