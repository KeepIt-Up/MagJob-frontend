import { Organization } from './../../organization/model/organization';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserId?: string;
  organizations: Organization[] = [];
  private apiUrl = '/api/users';

  constructor(private organizationService: OrganizationService,
    private http: HttpClient)
  {

  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  setCurrentUserId(user: User): void {
    this.currentUserId = user.id.toString();
    localStorage.setItem("User",this.currentUserId.toString());
  }

  getCurrentUserId(): string {
    if(this.currentUserId == null)
    {
      this.currentUserId = localStorage.getItem("User") as string;
    }
      
    return this.currentUserId;
  }

  clearCurrentUser(): void {
    this.currentUserId = '';
  }


belongToAnyOrganization(): Observable<boolean> {
  const userId: string = localStorage.getItem("User") || '';

  return new Observable<boolean>((observer) => {
    this.organizationService.getAllByUserId(userId).subscribe(
      (data: any) => {
        this.organizations = data.organizations;
        console.log(data);

        if (this.organizations.length === 0) {
          console.log(this.organizations.length);
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


  getUserData(userId: number): Observable<any>
  {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get(url);
  }

  updateUserData(userId: number, userData: User): Observable<any>
  {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.patch(url, userData);
  }

  getUserProfile(userId: string): Observable<UserProfile> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<UserProfile>(url);
  }
}
