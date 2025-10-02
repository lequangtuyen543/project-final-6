import { DELETE, GET, PATCH, POST } from "../utils/request";

export const getListJobs = async () => {
  const result = await GET(`jobs`);
  return result;
};

export const getDetailJob = async (id) => {
  const result = await GET(`jobs/${id}`);
  return result;
};

export const getJobsByCompanyId = async (id) => {
  const result = await GET(`jobs?idCompany=${id}`);
  return result;
};

export const createJob = async (data) => {
  const result = await POST(`jobs`, data);
  return result;
};

export const updateJob = async (id, data) => {
  const result = await PATCH(`jobs/${id}`, data);
  return result;
};

export const deleteJob = async (id) => {
  const result = await DELETE(`jobs/${id}`);
  return result;
};

