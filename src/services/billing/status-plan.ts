import { apiAuth } from "@/lib/api-manager";

export const statusPlanBilling = async () => {
  return (await apiAuth.get(`billing/user-subscription`)).data.data
};