import { TestBed } from '@angular/core/testing';

import { RoleFormService } from './role-form.service';

describe('RoleFormService', () => {
  let service: RoleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
