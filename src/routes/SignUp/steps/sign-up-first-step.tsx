import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SignUpType } from "@/schemas/sign-up-schema"
import { UseFormReturn } from "react-hook-form"

interface SignUpFirstStepProps {
  form: UseFormReturn<SignUpType>
  handleSubmit: () => void
}

export const SignUpFirstStep = ({ form, handleSubmit }: SignUpFirstStepProps) => {
  const { formState: { errors }, register } = form

  return (
    <Card>
      <CardContent className="py-5 px-10">
        <div className="w-full flex flex-col gap-5">
          <Input
            error={errors.firstStep?.firstName}
            placeholder="Primeiro nome"
            {...register("firstStep.firstName")}
          />
          <Input
            error={errors.firstStep?.lastName}
            placeholder="Último nome"
            {...register("firstStep.lastName")}
          />
          <Input
            error={errors.firstStep?.userName}
            placeholder="Nome de usuário"
            {...register("firstStep.userName")}
          />
          <Button onClick={handleSubmit} type="button" className="p-5 cursor-pointer">Próximo</Button>
        </div>
      </CardContent>
    </Card>
  )
}
