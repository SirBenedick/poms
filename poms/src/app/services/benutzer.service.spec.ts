import { TestBed } from '@angular/core/testing';

import { BenutzerService } from './benutzer.service';

describe('BenutzerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BenutzerService = TestBed.get(BenutzerService);
    expect(service).toBeTruthy();
  });
});
