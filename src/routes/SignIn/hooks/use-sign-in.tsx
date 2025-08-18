import { SignInSchema, SignInType } from "@/schemas/sign-in-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query"
import { signInService } from "@/services/sign-in-service"
import { QUERIES } from "@/constants/queries"
import { useNavigate } from "react-router"

export const useSignIn = () => {
  const navigate = useNavigate()

  const { register, handleSubmit: formSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignInSchema),
    reValidateMode: 'onChange',
    values: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = formSubmit((data: SignInType) => {
    mutate(data)
  })

  const handleSuccessSignIn = () => {
    navigateToHome()
  }

  const navigateToHome = () => {
    navigate('/home')
  }

  const { isPending, mutate } = useMutation({
    mutationKey: [QUERIES.QUERY_POST_SIGN_IN],
    mutationFn: (data: SignInType) => signInService(data),
    onSuccess: handleSuccessSignIn
  })

  return {
    states: {
      errors,
      isPending
    },
    actions: {
      register,
      handleSubmit,
    }
  }
}
