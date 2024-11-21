import {inject, Injectable} from '@angular/core';
import {OAuthService, } from 'angular-oauth2-oidc';
import {firstValueFrom} from 'rxjs';
import {RoleService} from "../../roles/service/role.service";
import {MembersService} from "../../organization/service/members.service";

@Injectable({
  providedIn: 'root',
})
export class RolePermission {
  private oauthService = inject(OAuthService);
  private roleService = inject(RoleService);
  private memberService = inject(MembersService);

  getUserID(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims.sub
  }

  getMemberID(organizationID: string): Promise<any> {
    const currentUserId = this.getUserID();

    return new Promise((resolve, reject) => {
      this.memberService.getAllByOrganization(String(organizationID)).subscribe({
        next: (response) => {
          if (response && response.body && response.body.members) {
            const matchedMember = response.body.members.find(
              (member: any) => member.userId === currentUserId
            );

            if (matchedMember) {
              resolve(matchedMember.id);
            } else {
              console.log('No matching user found.');
              resolve(null);
            }
          } else {
            console.error('No members found in response');
            reject('No members found');
          }
        },
        error: (err) => {
          console.error('Error fetching members:', err);
          reject(err);
        },
      });
    });
  }


  async getUserPermissions(question: string, organizationID: string): Promise<boolean> {
    try {
      const member = await this.getMemberID(organizationID);
      if (!member) {
        console.log('No matching member found. Permissions cannot be checked.');
        return false;
      }

      const role = await firstValueFrom(this.roleService.getRoleById(member));

      switch (question) {
        case 'Task':
          return role.canManageTasks;

        case 'Announcement':
          return role.canManageAnnouncements;

        case 'Invitation':
          return role.canManageInvitations;

        case 'Role':
          return role.canManageRoles;

        default:
          return false;
      }
    } catch (err) {
      console.error('Failed to load role:', err);
      return false;
    }
  }
}
