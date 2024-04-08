import { Member } from 'src/app/organization/components/organization-members/model/member';
import { Permission } from './permission';

export interface Role {
  id: string;
  name: string;
  color: { r: number; g: number; b: number };
  permissions: Permission[];
  members: Member[];
}
