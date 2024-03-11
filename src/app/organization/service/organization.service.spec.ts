import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationService]
    });
    service = TestBed.inject(OrganizationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all organizations', () => {
    const organizationsMock = [{ id: 1, name: 'Org 1' }, { id: 2, name: 'Org 2' }];
    
    service.getAllOrganizations().subscribe(organizations => {
      expect(organizations).toEqual(organizationsMock);
    });

    const req = httpTestingController.expectOne('/api/organizations');
    expect(req.request.method).toEqual('GET');
    req.flush(organizationsMock);
  });

});
