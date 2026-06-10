import { serverFetch } from "../core/serverMutation"

export const getPlanById = async (id) => {
 const resData=await serverFetch(`/api/plans?plan_id=${id}`);
 console.log(resData);
 
 return resData;
}