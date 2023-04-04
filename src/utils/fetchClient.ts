/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://test-presento.onrender.com';

type RequestMethod = 'GET' | 'POST' | 'PATCH';

const tokenString = sessionStorage.getItem('token') || '0';
const userToken = JSON.parse(tokenString);

function request<T>(url: string, method: RequestMethod = 'GET', data: any = null): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
      // Authorization: `Token ${userToken}`,
    };
  }

  if (url !== '/api/user/register/' && url !== '/api/user/token/') {
    console.log(userToken);

    options.headers = {
      ...options.headers,
      Authorization: `Token ${userToken}`,
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data)
};
