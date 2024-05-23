export interface UserRoleResponse {
  userRoleId: number;
  role: string;
  user: string;
  auditCreateDate: Date;
  state: number;
  stateUserRole: string;
  badgeColor: string;
  icEdit: object;
  icDelete: object;
}

export interface UserRoleByIdResponse {
  userRoleId: number;
  roleId: number;
  userId: number;
  state: number;
}
