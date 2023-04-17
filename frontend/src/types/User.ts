import { UserResponse } from './UserResponse';

export interface User extends Omit<UserResponse, 'id' | 'is_staff'> {
  password: string;
}
