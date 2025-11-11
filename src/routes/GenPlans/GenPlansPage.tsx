import { PageLayout } from "@/components/PageLayout"
import { PlanComponent } from "./components/PlanComponent"
import { useBillingSession } from "../v2/Billing/hooks/get-billing-sessions";

export const GenPlansPage = () => {

    return (
        <PageLayout>
            <div className="flex flex-col gap-10">
                <div className="text-[24px]">Planos</div>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-6">
                    <PlanComponent nomePlan="Plano Explorador" description="Experimente o Atenium Gratuitamente e Descubra o Poder da IA na Educação!" estadoPlan={true} preco={"0"} keyPlan="price_1SMTZICgvpJPF4Xlfo6ViXGR" useCheckout={}></PlanComponent>
                    <PlanComponent nomePlan="Plano Estudioso" description="Aprofunde sua jornada com IA na educação!" estadoPlan={false} preco={"29,90"} keyPlan="price_1SMRuDCgvpJPF4XlNBUGqB8V"></PlanComponent>
                    <PlanComponent nomePlan="Plano Sábio" description="Domine o Atenium com IA avançada." estadoPlan={false} preco={"69,90"} keyPlan="price_1SMSNaCgvpJPF4XlwZ4RYunT"></PlanComponent>
                    <PlanComponent nomePlan="Plano Luminar" description="Evolua com IA de ponta." estadoPlan={false} preco={"189,90"} keyPlan="price_1SMSOSCgvpJPF4XlDl4BO9D2"></PlanComponent>
                </div>
            </div>
            
        </PageLayout>
    )
}