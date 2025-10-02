import { GET, PATCH, POST } from "../utils/request";

export const getAllCompany = async () => {
  const result = await GET(`company`);
  return result;
};

export const getDetailCompany = async (id) => {
  const result = await GET(`company/${id}`);
  return result;
};

export const createCompany = async (data) => {
  const result = await POST(`company`, data);
  return result;
};

export const editCompany = async (id, data) => {
  const result = await PATCH(`company/${id}`, data);
  return result;
};

export const checkExist = async (key, value) => {
  const result = await GET(`company?${key}=${value}`);
  return result;
};

export const loginCompany = async (email, password) => {
  const result = await GET(`company?email=${email}&password=${password}`);
  return result;
};