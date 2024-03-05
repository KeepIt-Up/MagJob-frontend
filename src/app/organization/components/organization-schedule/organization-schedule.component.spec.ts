import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationScheduleComponent } from './organization-schedule.component';

describe('OrganizationScheduleComponent', () => {
  let component: OrganizationScheduleComponent;
  let fixture: ComponentFixture<OrganizationScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationScheduleComponent]
    });
    fixture = TestBed.createComponent(OrganizationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
