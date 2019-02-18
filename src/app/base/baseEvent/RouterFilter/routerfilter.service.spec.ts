import { TestBed } from '@angular/core/testing';

import { RouterfilterService } from './routerfilter.service';

describe('RouterfilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterfilterService = TestBed.get(RouterfilterService);
    expect(service).toBeTruthy();
  });
});
