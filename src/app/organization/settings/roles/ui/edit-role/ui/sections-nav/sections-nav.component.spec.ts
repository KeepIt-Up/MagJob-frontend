import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsNavComponent } from './sections-nav.component';

describe('SectionsNavComponent', () => {
  let component: SectionsNavComponent;
  let fixture: ComponentFixture<SectionsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
