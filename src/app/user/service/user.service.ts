import { Organization } from './../../organization/model/organization';
import { Observable, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { UserProfile } from '../model/user-profile';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserAPIService } from './user.api.service';
import { UserStateService } from './user.state.service';
import { createEntityState } from 'src/app/utils/create-entity-state';
import { UserUpdatePayload } from '../model/user-update-payload';
import { AuthStateService } from 'src/app/auth/service/auth.state.service';
import { AuthState } from 'src/app/utils/auth-state.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpService = inject(UserAPIService);
  private state = inject(UserStateService);

  organizations: Organization[] = [];
  private apiUrl = '/api/users';

  authState?: AuthState;

  constructor(
    private organizationService: OrganizationService,
    private http: HttpClient
  ) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getByUid(uid: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${uid}`);
  }

  create(): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, null);
  }

  private loadingState$ = toObservable(this.httpService.$loadingState);

  state$ = createEntityState(
    this.state.value$,
    this.loadingState$,
    (state) => state
  );

  initUserData(userUid: string) {
    this.httpService
      .initUserData(userUid)
      .pipe(
        tap((response) => {
          if (response[0].body) {
            this.state.setOrganizations(response[0].body);
          }
          if (response[1].body) {
            this.state.setInvitations(response[1].body);
          }
        })
      )
      .subscribe();
  }

  getOrganizations() {
    this.httpService
      .getOrganizations()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setOrganizations(response.body);
          }
        })
      )
      .subscribe();
  }

  getInvitations() {
    this.httpService
      .getInvitations()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setInvitations(response.body);
          }
        })
      )
      .subscribe();
  }

  belongToAnyOrganization(): Observable<boolean> {
    const userId: string = localStorage.getItem('User') || '';

    return new Observable<boolean>((observer) => {
      this.organizationService.getAllByUserId(userId).subscribe(
        (data: any) => {
          this.organizations = data.organizations;

          if (this.organizations.length === 0) {
            observer.next(false);
          } else {
            observer.next(true);
          }

          observer.complete();
        },
        (error) => {
          console.error('Error fetching organizations:', error);
          observer.error(error);
        }
      );
    });
  }

  getUserData(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get(url);
  }

  updateUserData(userId: number, userData: User): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.patch(url, userData);
  }

  getUserProfile(userId: string): Observable<UserProfile> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<UserProfile>(url);
  }
}
