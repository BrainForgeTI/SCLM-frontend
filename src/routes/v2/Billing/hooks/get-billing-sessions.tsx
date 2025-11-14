import { checkoutSessionBilling } from "@/services/billing/checkout-session";
import { statusPlanBilling } from "@/services/billing/status-plan";
import { AuthBillingStatus } from "@/types/auth_types/AuthBillingStatus";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBillingSession = () => {
  const queryClient = useQueryClient();

  const {data: resultPlanBilling,isLoading,isError} = useQuery<AuthBillingStatus>({
    queryKey: ["status-plan"],
    queryFn: statusPlanBilling,
  });
  
  const { mutate: useCheckoutSession } = useMutation({
    mutationFn: (data: string) => checkoutSessionBilling(data),
    onSuccess: (dataLink) => {
        console.log(dataLink)
        window.open(`${dataLink}`, "_blank");
        queryClient.invalidateQueries({ queryKey: ["status-plan"] });
    },
  });


  return {
    states: {
        resultPlanBilling,
        isLoading,
        isError
    },
    actions: {
      useCheckoutSession
    },
  };
};
