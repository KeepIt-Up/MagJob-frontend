import {inject, Injectable} from '@angular/core';
import {OAuthService, } from 'angular-oauth2-oidc';
import {catchError, first, firstValueFrom, forkJoin, map, mergeMap, Observable, of} from 'rxjs';
import {MemberRoleService} from "../../roles/service/member-role.service";
import {RoleService} from "../../roles/service/role.service";
import {MembersService} from "../../organization/service/members.service";
import {RoleResponse} from "../../roles/model/role";
import {MemberRole, MemberRoleResponse} from "../../roles/model/member-role";



@Injectable({
  providedIn: 'root',
})
export class RolePermission {
  private oauthService = inject(OAuthService);
  private memberRoleService = inject(MemberRoleService);
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

      const matchingRoleId = await this.roleService
        .getRolesByOrganization(organizationID)
        .pipe(
          mergeMap((response: any) => {
            if (!response?.roles || !Array.isArray(response.roles)) {
              console.log('Invalid roles response structure.');
              return [];
            }
            return response.roles;
          }),
          mergeMap((role: any) =>
            this.memberRoleService.getRoleMembersByRoleId(role.id).pipe(
              mergeMap((memberRoles: any) => {
                if (!memberRoles.roleMembers || memberRoles.roleMembers.length === 0) {
                  return [];
                }
                return memberRoles.roleMembers;
              }),
              mergeMap((roleMember: any) =>
                this.memberRoleService.getMemberRoleById(roleMember.id).pipe(
                  map((detailedRoleMember: any) => ({
                    detailedRoleMember,
                    roleId: role.id,
                  }))
                )
              )
            )
          ),
          first(
            ({ detailedRoleMember }) => detailedRoleMember.member.id === member,
            null
          ),
          map((match: any) => (match ? match.roleId : null))
        )
        .toPromise();

      if (!matchingRoleId) {
        console.log('No matching role found. Permissions cannot be checked.');
        return false;
      }

      const role = await this.getRole(matchingRoleId);
      if (!role) {
        console.log('Role not found. Permissions cannot be checked.');
        return false;
      }

      return this.checkPermission(question, role);
    } catch (err) {
      console.error('Failed to load permissions:', err);
      return false;
    }
  }

  private async getRole(roleId: string): Promise<RoleResponse | null> {
    try {
      return await firstValueFrom(
        this.roleService.getRoleById(roleId)
      );
    } catch (err) {
      console.error('Failed to fetch role:', err);
      return null;
    }
  }

  private checkPermission(question: string, role: RoleResponse): boolean {
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
  }



}
