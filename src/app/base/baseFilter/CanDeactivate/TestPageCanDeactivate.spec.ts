import { TestBed } from '@angular/core/testing';

import { EventCanDeactivate } from './TestPageCanDeactivate';

describe('EventCanDeactivate', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventCanDeactivate = TestBed.get(EventCanDeactivate);
    expect(service).toBeTruthy();
  });
});
