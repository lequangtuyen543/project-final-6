import { GET, POST } from "../utils/request";

export const createAnswer = async (options) => {
  const result = await POST(`answers`, options);
  return result;
}; 