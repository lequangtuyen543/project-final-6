import { GET } from "../utils/request";

export const getQuestionsList = async (topicId) => {
  const result = await GET(`questions?topicId=${topicId}`);
  return result;
}; 