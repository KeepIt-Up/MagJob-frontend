import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AnnouncementCardComponent } from "./announcement-card.component";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

describe('AnnouncementCardComponent', () => {
  let component: AnnouncementCardComponent;
  let fixture: ComponentFixture<AnnouncementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AnnouncementCardComponent, CommonModule, FormsModule ],
      providers: [ DatePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementCardComponent);
    component = fixture.componentInstance;
    component.announcement = {
      id: '1',
      title: 'Test Announcement',
      content: 'Test Content',
      author: {id: 1, firstName: "Joe", lastName: "Doe", pseudonym: "karakan"},
      dateOfExpiration: new Date()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle edit mode', () => {
    component.toggleMode();
    expect(component.isEditMode).toBeTrue();

    component.toggleMode();
    expect(component.isEditMode).toBeFalse();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.delete.emit(component.announcement.id);
    expect(component.delete.emit).toHaveBeenCalledWith('1');
  });

  it('should emit update event with correct values', () => {
    spyOn(component.update, 'emit');
    
    const newTitle = 'New Title';
    const newContent = 'New Content';
    
    component.toggleMode();
    fixture.detectChanges();
    
    const titleInput: HTMLInputElement = fixture.nativeElement.querySelector('#title');
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    
    titleInput.value = newTitle;
    textarea.value = newContent;
    titleInput.dispatchEvent(new Event('input'));
    textarea.dispatchEvent(new Event('input'));
  
    const expectedUpdateValue = {
      id: component.announcement.id,
      title: newTitle,
      content: newContent
    };
  
    fixture.detectChanges();
  
    const saveButton: HTMLButtonElement = fixture.nativeElement.querySelector('#saveButton');
    saveButton.click();
  
    expect(component.update.emit).toHaveBeenCalledWith(expectedUpdateValue);
  });
});
