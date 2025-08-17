import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { SignUpType } from "@/schemas/sign-up-schema"
import { Controller, UseFormReturn } from "react-hook-form"
import { Link } from "react-router"

interface SignUpThirdStepProps {
  form: UseFormReturn<SignUpType>
  handleSubmit: () => void
  isPendingValidate?: boolean
}

export const SignUpThirdStep = ({ form, handleSubmit, isPendingValidate }: SignUpThirdStepProps) => {
  const { register, formState: { errors } } = form

  return (
    <Card>
      <CardContent className="py-5 px-10">
        <div className="w-full flex flex-col gap-5">
          <Input
            {...register("thirdStep.email")}
            error={errors.thirdStep?.email}
            placeholder="E-mail"
          />

          <Input
            {...register("thirdStep.password")}
            error={errors.thirdStep?.password}
            placeholder="Senha"
          />

          <Input
            {...register("thirdStep.confirmPassword")}
            error={errors.thirdStep?.confirmPassword}
            placeholder="Confirme a senha"
          />

          <Controller
            name="thirdStep.acceptedTerms"
            control={form.control}
            render={({ field }) =>
              <div >
                <div className="flex gap-2 items-center">
                  <Checkbox
                    className="cursor-pointer"
                    onCheckedChange={field.onChange}
                  />
                  <p>Li e aceito os {" "} <Link to={"#"} className="text-primary underline">Termos de Uso</Link></p>
                </div>
                <p className="text-destructive text-start mt-2">{errors.thirdStep?.acceptedTerms?.message}</p>
              </div>
            }
          />
          <Button isLoading={isPendingValidate} onClick={handleSubmit} type="button" className="p-5 cursor-pointer">Próximo</Button>
        </div>
      </CardContent>
    </Card>
  )
}
