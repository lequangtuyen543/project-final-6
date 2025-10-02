import { GET, POST } from "../utils/request";

export const login = async (email, password) => {
  const result = await GET(`users?email=${email}&password=${password}`);
  return result;
};

export const register = async (options) => {
  const result = await POST(`users`, options);
  return result;
};

export const checkExist = async (key, value) => {
  const result = await GET(`users?${key}=${value}`);
  return result;
}; 