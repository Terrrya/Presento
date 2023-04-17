import { Login } from '../types/Login';
import { UserResponse } from '../types/UserResponse';
import { Token } from '../types/Token';
import { User } from '../types/User';
import { UserData } from '../types/UserData';
import { axiosApi } from '../utils/axiosApi';

export const loginUserOnServer = (data: Login) => {
  return axiosApi.post<Token>('user/token/', data);
};

export const refreshTokenOnServer = (refreshToken: Omit<Token, 'access'>) => {
  return axiosApi.post<Token>('user/token/refresh/', refreshToken);
};

export const createUserOnServer = (data: User) => {
  return axiosApi.post<User>('user/register/', data);
};

export const getUserDataFromServer = () => {
  return axiosApi.get<UserResponse>(`user/me/`);
};

export const updateDataOnServer = (data: UserData) => {
  return axiosApi.patch<UserResponse>('user/me/', data);
};
