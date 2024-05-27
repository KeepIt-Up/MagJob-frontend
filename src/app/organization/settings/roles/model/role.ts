import { FormControl, FormGroup } from "@angular/forms";

export interface Role {
    id: string,
    name: string,
    organizationId: string,

    canManageTasks: boolean,
    canManageAnnouncements: boolean,
    canManageInvitations: boolean,
    canManageRoles: boolean

    members: Member[]
}

export interface Member {
    id: string,
    firstname: string,
    lastname: string,
    organizationId: string
}
