import { GET } from "../utils/request";

export const getListTags = async () => {
  const result = await GET(`tags`);
  return result;
};

