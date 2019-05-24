import { TestBed } from '@angular/core/testing';

import { TestbackendService } from './testbackend.service';

describe('TestbackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestbackendService = TestBed.get(TestbackendService);
    expect(service).toBeTruthy();
  });
});
