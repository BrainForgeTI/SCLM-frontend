import { SignUpSchema } from "@/schemas/sign-up-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useSignUp = () => {
  const [step, setStep] = useState(1)

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
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
    const validStep = await form.trigger('thirdStep')
    if (validStep) {
      form.handleSubmit((data) => {
        console.log(data)
      })()
    }
  }

  const stepsAction = {
    "1": handleFirstStep,
    "2": handleSecondStep,
    "3": handleThirdStep
  }

  const handleSubmit = () => {
    stepsAction[step.toString() as keyof typeof stepsAction]()
  }

  return {
    states: {
      form,
      step
    },
    actions: {
      handleSubmit
    }
  }
}
