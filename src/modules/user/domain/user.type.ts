export interface UserProps {
  id?: bigint;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  password: string;
  phone?: string | null;
  isActive: boolean | null;
  roleId?: bigint | null;

  createdBy: string;
  updatedBy?: string | null;
}

export interface CreateUserProps {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  password: string;
  phone?: string | null;
  isActive: boolean | null;
  roleId?: bigint | null;

  createdBy: string;
}
