export interface RoleResponse {
  roleId: number;
  description: string;
  auditCreateDate: Date;
  state: number;
  stateRole: string;
  badgeColor: string;
  icEdit: object;
  icDelete: object;
}

export interface RoleByIdResponse {
  roleId: number;
  description: string;
  state: number;
}

export interface PermissionsByRoleResponse {
  menuId: number
  menu: string
  permissions: PermissionsResponse[];
}

export interface PermissionsResponse {
  permissionId: number
  permissionName: string
  permissionDescription: string
  selected: boolean
}