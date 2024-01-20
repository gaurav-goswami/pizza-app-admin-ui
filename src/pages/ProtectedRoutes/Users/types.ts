export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tenantId?: string;
  updatedAt: string;
}
