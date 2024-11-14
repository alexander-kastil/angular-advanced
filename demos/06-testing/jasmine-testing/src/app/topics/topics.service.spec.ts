import { TestBed } from '@angular/core/testing';

import { TopicsService } from './topics.service';
import { provideHttpClient } from '@angular/common/http';

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
