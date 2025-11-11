import { checkoutSessionBilling } from "@/services/billing/checkout-session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBillingSession = () => {
  const queryClient = useQueryClient();

//   const {data:missionsSecondary,isLoading,isError} = useQuery<MissionSecondaryInfo[]>({
//     queryKey: ["mission-secondary"],
//     queryFn: getAllMissionsSecondary,
//   });
  
  const { mutate: useCheckoutSession } = useMutation({
    mutationFn: (data: string) => checkoutSessionBilling(data),
    onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["mission-secondary"] });
      return console.log();
    },
  });


  return {
    states: {

    },
    actions: {
      useCheckoutSession
    },
  };
};
