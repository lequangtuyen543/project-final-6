import { GET } from "../utils/request";

export const getTopicList = async () => {
  const result = await GET(`topics`);
  return result;
}; 

export const getTopic = async (id) => {
  const result = await GET(`topics/${id}`);
  return result;
}; 