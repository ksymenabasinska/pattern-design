import { TestBed, inject } from '@angular/core/testing';

import { SvgPathFactoryService } from './svg-path-factory.service';

describe('SvgPathFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgPathFactoryService]
    });
  });

  it('should be created', inject([SvgPathFactoryService], (service: SvgPathFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
