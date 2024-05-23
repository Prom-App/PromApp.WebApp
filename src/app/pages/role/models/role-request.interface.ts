export interface RoleRequest {
  description: string;
  state: number;
  permissions: PermissionsRequest[];
}

export interface PermissionsRequest {
  permissionId: number;
  permissionName: string;
  permissionDescription: string;
}
