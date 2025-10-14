import { SignUpSchema, SignUpType } from "@/schemas/sign-up-schema";
import { signUp } from "@/services/sin-up";
import { validateEmail } from "@/services/validate-email";
import { validateSignUpToken } from "@/services/validate-sign-up-token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const useSignUp = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleBackStep = () => {
    if (step < 4 && step > 1) {
      setStep(step - 1);
    }
  };

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      secondStep: {
        gender: "",
      },
    },
  });

  const handleFirstStep = async () => {
    const validStep = await form.trigger("firstStep");
    if (validStep) {
      setStep(2);
    }
  };

  const handleSecondStep = async () => {
    const validStep = await form.trigger("secondStep");
    if (validStep) {
      setStep(3);
    }
  };

  const handleEmailValidation = () => {
    mutateValidateEmail(form.getValues("thirdStep.email"));
  };

  const handleThirdStep = async () => {
    const validSteps = await form.trigger("thirdStep");
    if (validSteps) {
      handleEmailValidation();
    }
  };

  const handleFourthStep = form.handleSubmit((data) => {
    mutateValidateSignUpToken({
      email: data.thirdStep.email,
      token: data.fourthStep.code,
    });
  });

  const stepsAction = {
    "1": handleFirstStep,
    "2": handleSecondStep,
    "3": handleThirdStep,
    "4": handleFourthStep,
  };

  const handleSubmit = () => {
    stepsAction[step.toString() as keyof typeof stepsAction]();
  };

  const handleValidateEmailSuccess = () => {
    setStep(4);
  };

  const { mutate: mutateValidateEmail, isPending: isPendingValidateEmail } =
    useMutation({
      mutationFn: (email: string) => validateEmail(email),
      onSuccess: handleValidateEmailSuccess,
    });

  const {
    mutate: mutateValidateSignUpToken,
    isError: isErrorSignUpToken,
    isPending: isPendingTokenValidation,
    isSuccess: isSuccessTokenValidation,
  } = useMutation({
    mutationFn: (data: { email: string; token: string }) =>
      validateSignUpToken(data.email, data.token),
    onSuccess: () => mutateCreateUser(form.getValues()),
  });

  const goToSignin = () => {
    navigate("/signin");
  };

  const { mutate: mutateCreateUser } = useMutation({
    mutationFn: (data: SignUpType) => signUp(data),
    onSuccess: () => goToSignin(),
  });

  return {
    states: {
      form,
      step,
      isPendingValidateEmail,
      isErrorSignUpToken,
      isPendingTokenValidation,
      isSuccessTokenValidation,
    },
    actions: {
      handleSubmit,
      mutateValidateEmail,
      mutateValidateSignUpToken,
      handleBackStep,
    },
  };
};
