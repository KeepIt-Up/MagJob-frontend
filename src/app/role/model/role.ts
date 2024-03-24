import { Permission } from './permission';

export interface Role {
  id: number;
  name: string;
  color: { r: number; g: number; b: number };
  permissions: Permission[];
}
