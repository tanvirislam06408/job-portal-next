import { serverFetch } from "../core/serverMutation";

const baseUrl = process.env.NEXT_PUBLIC_URL

export const getCompanyJobs = async (companyId, status = "active") => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    const data = await res.json();
    return data;
}

export const getAllJobs = async () => {
    const resData = await serverFetch('/jobs');
    return resData;
}

export const getSingleJob = async (jobId) => {
  const resData=await serverFetch(`/job/${jobId}`)
  return resData;
}