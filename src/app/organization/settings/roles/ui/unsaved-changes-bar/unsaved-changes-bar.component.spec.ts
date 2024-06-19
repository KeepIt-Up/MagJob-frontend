import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedChangesBarComponent } from './unsaved-changes-bar.component';

describe('UnsavedChangesBarComponent', () => {
  let component: UnsavedChangesBarComponent;
  let fixture: ComponentFixture<UnsavedChangesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsavedChangesBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsavedChangesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
