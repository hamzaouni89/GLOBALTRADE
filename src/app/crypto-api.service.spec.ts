import { TestBed } from '@angular/core/testing';

import { CryptoAPIService } from './crypto-api.service';

describe('CryptoAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoAPIService = TestBed.get(CryptoAPIService);
    expect(service).toBeTruthy();
  });
});
