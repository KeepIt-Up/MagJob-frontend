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
    firstName: string,
    lastName: string,
    organizationId: string
}

export interface UpdateRolePayload {
    name: string,
    canManageTasks: boolean,
    canManageAnnouncements: boolean,
    canManageInvitations: boolean,
    canManageRoles: boolean
}