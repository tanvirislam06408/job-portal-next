'use server'

import { revalidatePath } from "next/cache";
import { protectRoute, serverFetch, serverMutation } from "../core/serverMutation";
import { getUserSession } from "../core/session";

export const getCompanyData = async (recruiterId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/company?recruiterId=${recruiterId}`);
  const resData = await res.json();
  return resData;
};


export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  const data = await getCompanyData(user?.id);
  return data;
}

export const getAllCompanies = async () => {
  return await protectRoute('/api/company')
}

export const updateCompaniesApproval = async (id, data) => {
  console.log('initail data',id,data);
  
  const res = await serverMutation(`/api/companies/${id}`, data, 'PATCH');
  revalidatePath('/dashboard/admin/companies')
  return res;
}