import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useBillingSession } from "@/routes/v2/Billing/hooks/get-billing-sessions";

interface Props {
    nomePlan: string;
    description:string;
    estadoPlan: boolean;
    preco:string;
    keyPlan:string
}
export const  PlanComponent = (props:Props) => {

    const {states: { },actions: {useCheckoutSession }} = useBillingSession();

    return (
        <div className="flex gap-2"> 
                <Item variant="outline" className="flex w-[350px] md:w-[700px]">
                    <ItemHeader  className="text-[18px]">{props.nomePlan}</ItemHeader>
                    <ItemContent>
                    <ItemDescription>
                        {props.description}
                    </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                    <Button variant="outline" size="sm" disabled={props.estadoPlan} className="flex w-[80px] cursor-pointer" onClick={() => {useCheckoutSession(props.keyPlan)}}>
                        {props.estadoPlan == true ? "Ativado" : "Assinar"}
                    </Button>
                    </ItemActions>
                    <ItemFooter className="">
                        R$ {props.preco} /mês
                    </ItemFooter>
                </Item>
        </div>
    )
}