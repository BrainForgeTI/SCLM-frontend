import { PageLayout } from "@/components/PageLayout"
import { PlanComponent } from "./components/PlanComponent"
import { useBillingSession } from "../v2/Billing/hooks/get-billing-sessions";
import { TypePlans } from "@/enums/type-plans";
export const GenPlansPage = () => {
    const {states: {resultPlanBilling},actions: { }} = useBillingSession();
    return (
        <PageLayout>
            <div className="flex flex-col gap-10">
                <div className="text-[24px]">Planos</div>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-6">
                    <PlanComponent nomePlan="Plano Explorador" description="Experimente o Atenium Gratuitamente e Descubra o Poder da IA na Educação!" estadoPlan={resultPlanBilling?.typePlan === TypePlans.FREE || resultPlanBilling?.typePlan === null} preco={"0"} keyPlan="price_1SMTZICgvpJPF4Xlfo6ViXGR"></PlanComponent>
                    <PlanComponent nomePlan="Plano Estudioso" description="Aprofunde sua jornada com IA na educação!" estadoPlan={resultPlanBilling?.typePlan === TypePlans.ESTUDIOSO} preco={"29,00"} keyPlan="price_1SMRuDCgvpJPF4XlNBUGqB8V"></PlanComponent>
                    <PlanComponent nomePlan="Plano Sábio" description="Domine o Atenium com IA avançada." estadoPlan={resultPlanBilling?.typePlan === TypePlans.PRO} preco={"69,90"} keyPlan="price_1SMSNaCgvpJPF4XlwZ4RYunT"></PlanComponent>
                    <PlanComponent nomePlan="Plano Luminar" description="Evolua com IA de ponta." estadoPlan={resultPlanBilling?.typePlan === TypePlans.LUMINAR} preco={"259,60"} keyPlan="price_1SMSOSCgvpJPF4XlDl4BO9D2"></PlanComponent>
                </div>
            </div>
            
        </PageLayout>
    )
}