import { Login } from '../types/Login';
import { UserResponse } from '../types/UserResponse';
import { Token } from '../types/Token';
import { User } from '../types/User';
import { UserData } from '../types/UserData';
import { client } from '../utils/fetchClient';

export const createUserOnServer = (data: User) => {
  return client.post<User>('/api/user/register/', data);
};

export const loginUserOnServer = (data: Login) => {
  return client.post<Token>('/api/user/token/', data);
};

export const getUserDataFromServer = () => {
  return client.get<UserResponse>(`/api/user/me/`);
};

export const updateDataOnServer = (data: UserData) => {
  return client.patch<any>('/api/user/me/', data);
};
