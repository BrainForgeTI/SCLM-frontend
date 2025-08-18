import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { SignUpType } from "@/schemas/sign-up-schema"
import { useEffect, useState } from "react"
import { Controller, UseFormReturn } from "react-hook-form"

interface SignUpFourthStepProps {
  form: UseFormReturn<SignUpType>
  handleSubmit: () => void
  handleResend: (email: string) => void
  tokenError?: boolean
  isPendingTokenValidation?: boolean
  isSuccessTokenValidation?: boolean
}


export const SignUpFourthStep = ({ form, handleSubmit, handleResend, tokenError, isPendingTokenValidation, isSuccessTokenValidation }: SignUpFourthStepProps) => {
  const [counter, setCounter] = useState(60)
  const [disabledResend, setDisabledResend] = useState(true)

  const { formState: { errors } } = form

  const handleResendEmail = () => {
    setCounter(60)
    setDisabledResend(true)
    handleResend(form.getValues("thirdStep.email"))
  }

  useEffect(() => {
    if (!disabledResend) return

    const timer = setInterval(() => {
      setCounter(prev => {
        if (prev === 1) {
          setDisabledResend(false)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [disabledResend])

  return (
    <Card>
      <CardHeader><h2 className="text-center text-[16px] font-medium">Código de confirmação</h2></CardHeader>
      <CardContent className="px-10 flex flex-col gap-10 items-center">
        <p className="text-base-content/70 text-[14px] text-center">Enviamos um código de confirmação para o email informado anteriormente. Digite o código abaixo para validar sua conta. Outro código poderá ser gerado após 1 minuto.</p>
        <div className="w-full flex flex-col items-center gap-5">
          <Controller
            name="fourthStep.code"
            control={form.control}
            render={({ field }) =>
              <InputOTP maxLength={4} value={field.value} onChange={field.onChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            }
          />
          {!tokenError && <p className="text-destructive text-center">{errors.fourthStep?.code?.message}</p>}
          {tokenError && <p className="text-destructive text-center">Código inválido</p>}
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button disabled={isSuccessTokenValidation || isPendingTokenValidation} onClick={handleSubmit} type="button" className="p-5 cursor-pointer w-full cursor-pointer">Confirmar</Button>
          <Button variant={'outline'} disabled={disabledResend} onClick={handleResendEmail} className="w-full">
            Enviar outro código {counter}s
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
