import { GET } from "../utils/request";

export const getAllCity = async () => {
  const result = await GET(`city`);
  return result;
}; 

export const getListCity = async () => {
  const result = await GET(`city`);
  return result;
}; 