export enum RoleName {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MANAGER = 'ROLE_MANAGER'
}

export interface Role {
  id: number;
  name: RoleName;
}
