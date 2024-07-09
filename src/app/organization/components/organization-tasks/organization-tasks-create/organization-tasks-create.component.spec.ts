import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTasksCreateComponent } from './organization-tasks-create.component';

describe('OrganizationTasksCreateComponent', () => {
  let component: OrganizationTasksCreateComponent;
  let fixture: ComponentFixture<OrganizationTasksCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationTasksCreateComponent]
    });
    fixture = TestBed.createComponent(OrganizationTasksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
