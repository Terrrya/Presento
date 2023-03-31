import { Login } from '../types/Login';
import { Token } from '../types/Token';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const createUserOnServer = (data: User) => {
  return client.post<User>('/api/user/register/', data);
};

export const loginUserOnServer = (data: Login) => {
  return client.post<Token>('/api/user/login/', data);
};

export const getUserInfoFromServer = () => {
  return client.get<any>(`/api/user/me`);
};
