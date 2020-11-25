import { UserRole, OrganizationType } from '../../common/enums';

export interface CreateMemberDto {
  firstName: string;
  middleName: string;
  lastName: string;
  role: UserRole
  organization?: string;
}

export interface UpdateMemberDto {
  firstName?: string;
  middleName?: string;
  lastName?:string;
}