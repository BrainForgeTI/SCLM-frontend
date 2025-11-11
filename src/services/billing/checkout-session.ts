import { apiAuth } from "@/lib/api-manager";

export const checkoutSessionBilling = async (priceId: string) => {
  return (await apiAuth.post(`billing/checkout-session`,{priceId})).data
    .data;
};