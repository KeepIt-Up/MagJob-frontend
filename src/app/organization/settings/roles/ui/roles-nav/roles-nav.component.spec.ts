import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesNavComponent } from './roles-nav.component';

describe('RolesNavComponent', () => {
  let component: RolesNavComponent;
  let fixture: ComponentFixture<RolesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
