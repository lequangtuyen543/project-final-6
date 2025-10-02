import { DELETE, GET, PATCH, POST } from "../utils/request";

export const deleteCV = async (id) => {
  const result = await DELETE(`cv/${id}`);
  return result;
};

export const createCV = async (data) => {
  const result = await POST(`cv`, data);
  return result;
};

export const getListCV = async (idCompany) => {
  const result = await GET(`cv`, idCompany);
  return result;
};

export const getDetailCV = async (id) => {
  const result = await GET(`cv/${id}`);
  return result;
};

export const changeStatusCV = async (id, options) => {
  const result = await PATCH(`cv/${id}`, options);
  return result;
};