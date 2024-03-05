import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserProfileComponent } from '../view/user-profile/view/user-profile.component';
import { UserProfileService } from './user-profile.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockUserProfileService: jasmine.SpyObj<UserProfileService>;

  beforeEach(() => {
    mockUserProfileService = jasmine.createSpyObj('UserProfileService', ['getUserProfile']);

    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } },
        { provide: UserProfileService, useValue: mockUserProfileService }
      ]
    });

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user profile on initialization', () => {
    const mockUserProfile = { id: 1, firstname: 'testuser', surname:'P@ssword1' };
    mockUserProfileService.getUserProfile.and.returnValue(of(mockUserProfile));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.userProfile).toEqual(mockUserProfile);
  });
});

