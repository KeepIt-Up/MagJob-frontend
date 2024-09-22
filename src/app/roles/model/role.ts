export interface Role {
  id: number;
  name: string;
}

export interface RoleResponse {
  id: number;
  name: string;
  externalId: string;
  canManageTasks: boolean;
  canManageAnnouncements: boolean;
  canManageInvitations: boolean;
  canManageRoles: boolean;
  organization: {
    id: number;
    name: string;
  };
}

export interface RoleCreatePayload {
  name: string,
  organization: number
  //permissions: Permission[],
  //color?: { r: number; g: number; b: number }
}


export interface RoleUpdatePayload {
}

