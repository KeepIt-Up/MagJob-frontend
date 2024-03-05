// src/app/user-settings/user-settings.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserSettingsService } from '../../../service/user-settings.service';
import { UserSettingsComponent } from './user-settings.component';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;
  let mockActivatedRoute: any;
  let mockUserSettingsService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1' // Assuming userId is '1' in this example
        }
      }
    };

    mockUserSettingsService = jasmine.createSpyObj('UserSettingsService', ['updateUserSettings']);

    TestBed.configureTestingModule({
      declarations: [UserSettingsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserSettingsService, useValue: mockUserSettingsService }
      ]
    });

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and userId on ngOnInit', () => {
    expect(component.passwordForm).toBeDefined();
    expect(component.userId).toBe(1); // Assuming userId is '1' in this example
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call updateUserSettings when onSubmit is called', () => {
    // Assuming the form is valid for simplicity in this example
    component.passwordForm.setValue({
      password: {
        currentPassword: 'currentPassword',
        newPassword: 'newPassword',
        confirmNewPassword: 'newPassword'
      },
      email: 'newemail@example.com',
      name: {
        firstName: 'John',
        surname: 'Doe'
      }
    });

    component.onSubmit();

    expect(mockUserSettingsService.updateUserSettings).toHaveBeenCalledOnceWith({
      id: 1,
      username: 'username',
      password: 'newPassword',
      email: 'newemail@example.com',
      firstName: 'John',
      surname: 'Doe'
    });
  });
});
