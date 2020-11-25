import { UserRole } from '../common/enums';

interface Members {
  // @ts-ignore
  [key: string]: UserRole
}

interface UsersCollection {
  firstName: string;
  middleName: string;
  lastName: string;
  roles: any;
}

interface OrganizationsCollection {
  name: string;
  desctiption: string;
  owner: string;
  members: Members
}

interface Collections {
  user: UsersCollection;
  organizations: OrganizationsCollection;
}