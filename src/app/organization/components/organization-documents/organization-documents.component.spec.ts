import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDocumentsComponent } from './organization-documents.component';

describe('OrganizationDocumentsComponent', () => {
  let component: OrganizationDocumentsComponent;
  let fixture: ComponentFixture<OrganizationDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationDocumentsComponent]
    });
    fixture = TestBed.createComponent(OrganizationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
