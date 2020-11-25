import { UserRole, OrganizationType } from '../../common/enums';

export interface CreateOrganizationDto {
  name: string;
  type: OrganizationType;
  description?: string;
}

export interface UpdateOrganizationDto {
  name?: string;
  description?: string;
  type?: OrganizationType;
}

export interface JoinDto {
  organizationId: string,
  uid: string
}

export interface Members {
  [key: string]: UserRole
}