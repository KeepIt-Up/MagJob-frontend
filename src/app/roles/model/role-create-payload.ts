import { Permission } from "./permission";

export interface RoleCreatePayload {
    name: string,
    organization: number
    //permissions: Permission[],
    //color?: { r: number; g: number; b: number }
}
