export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Equipment {
  id: string;
  code: string;
  name: string;
  totalQuantity: number;
  availableQuantity: number;
}
