import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalEffectsComponent } from './signal-effects.component';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SignalEffectsComponent', () => {
  let component: SignalEffectsComponent;
  let fixture: ComponentFixture<SignalEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignalEffectsComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideMarkdown()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignalEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
