import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserSettingsService } from './user-settings.service';
import { UserSettings } from '../model/user-settings';

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserSettingsService]
    });

    service = TestBed.inject(UserSettingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update user settings', () => {
    const userSettings: UserSettings = {
      id: 1,
      username: 'testuser',
      password: 'newPassword',
      email: 'newemail@example.com',
      firstName: 'John',
      surname: 'Doe'
    };

    service.updateUserSettings(userSettings).subscribe(updatedUserSettings => {
      expect(updatedUserSettings).toEqual(userSettings);
    });

    const req = httpTestingController.expectOne('your-api-endpoint/user-settings/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(userSettings);
  });
});
