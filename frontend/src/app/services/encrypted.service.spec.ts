import { TestBed } from '@angular/core/testing';

import { EncryptedService } from './encrypted.service';

describe('EncryptedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptedService = TestBed.get(EncryptedService);
    expect(service).toBeTruthy();
  });
});
