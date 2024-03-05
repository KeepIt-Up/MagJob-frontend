import { TestBed } from '@angular/core/testing';

import { OrganizationCreationService } from './organization-creation.service';

describe('OrganizationCreationService', () => {
  let service: OrganizationCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
