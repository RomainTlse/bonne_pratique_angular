import { TestBed } from '@angular/core/testing';

import { LoadDynamicComponentService } from './load-dynamic-component.service';

describe('LoadDynamicComponentService', () => {
  let service: LoadDynamicComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDynamicComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
