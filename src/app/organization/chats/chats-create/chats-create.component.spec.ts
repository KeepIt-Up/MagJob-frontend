import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsCreateComponent } from './chats-create.component';

describe('ChatsCreateComponent', () => {
  let component: ChatsCreateComponent;
  let fixture: ComponentFixture<ChatsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
