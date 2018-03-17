import { TestBed, inject } from '@angular/core/testing';

import { FacetFilterService } from './facet-filter.service';

describe('FacetFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacetFilterService]
    });
  });

  it('should be created', inject([FacetFilterService], (service: FacetFilterService) => {
    expect(service).toBeTruthy();
  }));
});
