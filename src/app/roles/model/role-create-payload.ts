import { Permission } from "./permission";

export interface RoleCreatePayload {
    name: string,
    permissions: Permission[],
    color?: { r: number; g: number; b: number }
}
