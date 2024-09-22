import {Role} from "./role";

export interface Member{
  id: number,
  pseudonym: string
}

export interface MemberRole {
  memberId: number
}

export interface MemberRoleResponse {
  id: string,
  member: Member,
  role: Role
}

export interface MemberRoleCreatePayload{
  member: string,
  role: number
}

export interface MemberRoleCreateManyPayload{
  roleId: number,
  roleMembers: MemberRole[]
}
