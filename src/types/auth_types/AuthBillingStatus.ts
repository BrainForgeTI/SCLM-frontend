import { TypePlans } from "@/enums/type-plans"

export type AuthBillingStatus = {
    id: string,
    userId: string,
    stripeCostumerId: string,
    stripeSubscriptionId: string,
    typePlan: TypePlans,
    statusPlan: string,
    periordStart: string,
    periordEnd: string,
    updated_at: string,
    created_at: string
}