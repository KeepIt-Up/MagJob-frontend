import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTaskComponent } from './organization-task.component';

describe('OrganizationTaskComponent', () => {
  let component: OrganizationTaskComponent;
  let fixture: ComponentFixture<OrganizationTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
