import { SignUpSchema } from "@/schemas/sign-up-schema"
import { validateEmail } from "@/services/validate-email"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useSignUp = () => {
  const [step, setStep] = useState(1)

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      secondStep: {
        gender: ''
      }
    }
  })

  const handleFirstStep = async () => {
    const validStep = await form.trigger('firstStep')
    if (validStep) {
      setStep(2)
    }
  }

  const handleSecondStep = async () => {
    const validStep = await form.trigger('secondStep')
    if (validStep) {
      setStep(3)
    }
  }

  const handleThirdStep = async () => {
    const validSteps = await form.trigger(["firstStep", "secondStep", "thirdStep"])
    if (validSteps) {
      mutateValidateEmail(form.getValues("thirdStep.email"))
    }
  }

  const handleFourthStep = form.handleSubmit((data) => {
    console.log(data)
  })

  const stepsAction = {
    "1": handleFirstStep,
    "2": handleSecondStep,
    "3": handleThirdStep,
    "4": handleFourthStep
  }

  const handleSubmit = () => {
    stepsAction[step.toString() as keyof typeof stepsAction]()
  }

  const handleValidateEmailSuccess = () => {
    setStep(4)
  }

  const { mutate: mutateValidateEmail, isPending: isPendingValidateEmail } = useMutation({
    mutationFn: (email: string) => validateEmail(email),
    onSuccess: handleValidateEmailSuccess
  })

  return {
    states: {
      form,
      step,
      isPendingValidateEmail
    },
    actions: {
      handleSubmit
    }
  }
}
