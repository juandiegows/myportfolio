import { TestBed } from '@angular/core/testing';

import { ColorFilterService } from './color-filter.service';

describe('ColorFilterService', () => {
  let service: ColorFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
