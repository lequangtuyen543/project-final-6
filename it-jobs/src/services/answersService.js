import { getCookie } from "../helpers/cookie";
import { GET } from "../utils/request";

export const getAnswersByUserId = async () => {
  const userId = getCookie("id");
  const result = await GET(`answers?userId=${userId}`);
  return result;
};

export const getAnswer = async (id) => {
  const result = await GET(`answers/${id}`);
  return result;
}; 