import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTasksComponent } from './organization-tasks.component';

describe('OrganizationTasksComponent', () => {
  let component: OrganizationTasksComponent;
  let fixture: ComponentFixture<OrganizationTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationTasksComponent]
    });
    fixture = TestBed.createComponent(OrganizationTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
