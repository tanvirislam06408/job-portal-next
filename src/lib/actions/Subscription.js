import { serverMutation } from "../core/serverMutation"

export const createSubscription = async (data) => {
 const result=await serverMutation('/api/plans',data);
 return result;
}