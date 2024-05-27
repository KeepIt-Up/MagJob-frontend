import { Injectable } from '@angular/core';
import { Role } from '../model/role';


export type RoleState = 
{
  roles: Role[],
  selectedRole: Role
}

@Injectable({
  providedIn: 'root'
})
export class RoleLogicService {


// selectedSection = signal<SectionType>(SectionType.APPEARANCE);
// selectedRole$ = signal<Role>(roles[0]);


// constructor() { 
//   this.setPermissionsForm(this.selectedRole$())
//   this.roleForm.setValue({
//     name: this.selectedRole$().name
//   });
// }

//   setSelectedRole(roleId: string)
//   {
//     this.selectedRole$.set(roles.find(item => item.id == roleId) as Role);
//     this.setPermissionsForm(this.selectedRole$());
//     this.roleForm.setValue({
//       name: this.selectedRole$().name
//     });
//   }

//   setPermissionsForm(role: Role)
//   {
//     this.permissionForm.setValue({
//       canManageAnnouncements: this.selectedRole$().canManageAnnouncements,
//       canManageInvitations: this.selectedRole$().canManageInvitations,
//       canManageRoles: this.selectedRole$().canManageRoles,
//       canManageTasks: this.selectedRole$().canManageTasks
//     });
//   }

}


export function getRoles(): Role[]
{
    return roles;
}

const roles: Role[] = [
    {
        id: "1",
        name: "Admin",
        organizationId: "org1",
        canManageTasks: true,
        canManageAnnouncements: true,
        canManageInvitations: true,
        canManageRoles: true,
        members: [
            { id: "m1", firstname: "John", lastname: "Doe", organizationId: "org1" },
            { id: "m2", firstname: "Jane", lastname: "Smith", organizationId: "org1" },
            { id: "m3", firstname: "Alice", lastname: "Johnson", organizationId: "org1" },
            { id: "m4", firstname: "Bob", lastname: "Brown", organizationId: "org1" },
            { id: "m5", firstname: "Charlie", lastname: "Davis", organizationId: "org1" }
        ]
    },
    {
        id: "2",
        name: "Manager",
        organizationId: "org1",
        canManageTasks: true,
        canManageAnnouncements: true,
        canManageInvitations: false,
        canManageRoles: false,
        members: [
            { id: "m6", firstname: "David", lastname: "Wilson", organizationId: "org1" },
            { id: "m7", firstname: "Eva", lastname: "Moore", organizationId: "org1" },
            { id: "m8", firstname: "Frank", lastname: "Taylor", organizationId: "org1" },
            { id: "m9", firstname: "Grace", lastname: "Anderson", organizationId: "org1" },
            { id: "m10", firstname: "Hank", lastname: "Thomas", organizationId: "org1" }
        ]
    },
    {
        id: "3",
        name: "Editor",
        organizationId: "org2",
        canManageTasks: true,
        canManageAnnouncements: false,
        canManageInvitations: false,
        canManageRoles: false,
        members: [
            { id: "m11", firstname: "Ivy", lastname: "Jackson", organizationId: "org2" },
            { id: "m12", firstname: "Jack", lastname: "White", organizationId: "org2" },
            { id: "m13", firstname: "Kara", lastname: "Harris", organizationId: "org2" },
            { id: "m14", firstname: "Leo", lastname: "Martin", organizationId: "org2" },
            { id: "m15", firstname: "Mia", lastname: "Garcia", organizationId: "org2" },
            { id: "m16", firstname: "Nina", lastname: "Martinez", organizationId: "org2" },
            { id: "m17", firstname: "Oscar", lastname: "Robinson", organizationId: "org2" }
        ]
    },
    {
        id: "4",
        name: "Viewer",
        organizationId: "org2",
        canManageTasks: false,
        canManageAnnouncements: false,
        canManageInvitations: false,
        canManageRoles: false,
        members: [
            { id: "m18", firstname: "Paul", lastname: "Clark", organizationId: "org2" },
            { id: "m19", firstname: "Quinn", lastname: "Rodriguez", organizationId: "org2" },
            { id: "m20", firstname: "Ruth", lastname: "Lewis", organizationId: "org2" },
            { id: "m21", firstname: "Sam", lastname: "Lee", organizationId: "org2" },
            { id: "m22", firstname: "Tina", lastname: "Walker", organizationId: "org2" }
        ]
    },
    {
        id: "5",
        name: "Contributor",
        organizationId: "org3",
        canManageTasks: true,
        canManageAnnouncements: true,
        canManageInvitations: false,
        canManageRoles: false,
        members: [
            { id: "m23", firstname: "Uma", lastname: "Hall", organizationId: "org3" },
            { id: "m24", firstname: "Vince", lastname: "Allen", organizationId: "org3" },
            { id: "m25", firstname: "Wade", lastname: "Young", organizationId: "org3" },
            { id: "m26", firstname: "Xena", lastname: "Hernandez", organizationId: "org3" },
            { id: "m27", firstname: "Yara", lastname: "King", organizationId: "org3" },
            { id: "m28", firstname: "Zack", lastname: "Wright", organizationId: "org3" }
        ]
    },
    {
        id: "6",
        name: "Supervisor",
        organizationId: "org3",
        canManageTasks: true,
        canManageAnnouncements: true,
        canManageInvitations: true,
        canManageRoles: false,
        members: [
            { id: "m29", firstname: "Amy", lastname: "Lopez", organizationId: "org3" },
            { id: "m30", firstname: "Brian", lastname: "Hill", organizationId: "org3" },
            { id: "m31", firstname: "Cathy", lastname: "Scott", organizationId: "org3" },
            { id: "m32", firstname: "Derek", lastname: "Green", organizationId: "org3" },
            { id: "m33", firstname: "Elena", lastname: "Adams", organizationId: "org3" },
            { id: "m34", firstname: "Finn", lastname: "Baker", organizationId: "org3" },
            { id: "m35", firstname: "Gina", lastname: "Gonzalez", organizationId: "org3" }
        ]
    },
    {
        id: "7",
        name: "Coordinator",
        organizationId: "org4",
        canManageTasks: true,
        canManageAnnouncements: false,
        canManageInvitations: false,
        canManageRoles: false,
        members: [
            { id: "m36", firstname: "Henry", lastname: "Carter", organizationId: "org4" },
            { id: "m37", firstname: "Iris", lastname: "Mitchell", organizationId: "org4" },
            { id: "m38", firstname: "Jackie", lastname: "Perez", organizationId: "org4" },
            { id: "m39", firstname: "Kevin", lastname: "Roberts", organizationId: "org4" },
            { id: "m40", firstname: "Lara", lastname: "Turner", organizationId: "org4" }
        ]
    },
    {
        id: "8",
        name: "Assistant",
        organizationId: "org4",
        canManageTasks: false,
        canManageAnnouncements: true,
        canManageInvitations: false,
        canManageRoles: false,
        members: [
            { id: "m41", firstname: "Mona", lastname: "Phillips", organizationId: "org4" },
            { id: "m42", firstname: "Nate", lastname: "Campbell", organizationId: "org4" },
            { id: "m43", firstname: "Olivia", lastname: "Parker", organizationId: "org4" },
            { id: "m44", firstname: "Pete", lastname: "Evans", organizationId: "org4" },
            { id: "m45", firstname: "Quincy", lastname: "Edwards", organizationId: "org4" },
            { id: "m46", firstname: "Rachel", lastname: "Collins", organizationId: "org4" }
        ]
    },
    {
        id: "9",
        name: "Analyst",
        organizationId: "org5",
        canManageTasks: true,
        canManageAnnouncements: false,
        canManageInvitations: false,
        canManageRoles: false,
        members: [
            { id: "m47", firstname: "Sara", lastname: "Stewart", organizationId: "org5" },
            { id: "m48", firstname: "Tom", lastname: "Morris", organizationId: "org5" },
            { id: "m49", firstname: "Ursula", lastname: "Murphy", organizationId: "org5" },
            { id: "m50", firstname: "Victor", lastname: "Cook", organizationId: "org5" },
            { id: "m51", firstname: "Wendy", lastname: "Bell", organizationId: "org5" },
            { id: "m52", firstname: "Xander", lastname: "Howard", organizationId: "org5" },
            { id: "m53", firstname: "Yvonne", lastname: "Ward", organizationId: "org5" },
            { id: "m54", firstname: "Zane", lastname: "Brooks", organizationId: "org5" }
        ]
    },
    {
        id: "10",
        name: "SpecialistSpecialistSpecialistSpecialistSpecialist",
        organizationId: "org5",
        canManageTasks: false,
        canManageAnnouncements: false,
        canManageInvitations: true,
        canManageRoles: false,
        members: [
            { id: "m55", firstname: "Abby", lastname: "Griffin", organizationId: "org5" },
            { id: "m56", firstname: "Blake", lastname: "Watson", organizationId: "org5" },
            { id: "m57", firstname: "Cara", lastname: "Bennett", organizationId: "org5" },
            { id: "m58", firstname: "Dan", lastname: "Morgan", organizationId: "org5" },
            { id: "m59", firstname: "Ella", lastname: "Gray", organizationId: "org5" }
        ]
    }
];