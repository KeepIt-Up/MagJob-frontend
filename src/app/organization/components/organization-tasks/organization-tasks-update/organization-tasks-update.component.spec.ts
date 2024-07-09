import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTasksUpdateComponent } from './organization-tasks-update.component';

describe('OrganizationTasksUpdateComponent', () => {
  let component: OrganizationTasksUpdateComponent;
  let fixture: ComponentFixture<OrganizationTasksUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationTasksUpdateComponent]
    });
    fixture = TestBed.createComponent(OrganizationTasksUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
