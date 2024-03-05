import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatonNavComponent } from './organizaton-nav.component';

describe('OrganizatonNavComponent', () => {
  let component: OrganizatonNavComponent;
  let fixture: ComponentFixture<OrganizatonNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizatonNavComponent]
    });
    fixture = TestBed.createComponent(OrganizatonNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
