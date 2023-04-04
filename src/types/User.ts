import { Response } from './Response'

export interface User extends Omit<Response, 'id' | 'is_staff'> {
  password: string;
}
