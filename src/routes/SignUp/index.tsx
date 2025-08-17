import { PagelayoutAuth } from "@/components/PagelayoutAuth"
import TreeTravaller from "../../assets/images/treeTravallers.png";
import { Card } from "@/components/ui/card";
import { NavLink } from "react-router";
import { SignUpFirstStep } from "./steps/sign-up-first-step";
import { useSignUp } from "./hooks/use-sign-up";
import { SignUpSecondStep } from "./steps/sign-up-second-step";
import { SignUpThirdStep } from "./steps/sign-up-third-step";
import { SignUpFourthStep } from "./steps/sign-up-fourth";

export const SignUpPage = () => {
  const { states: { form, step, isPendingValidateEmail }, actions: { handleSubmit } } = useSignUp()

  const renderStep = (step: number) => {
    if (step == 1) {
      return (
        <SignUpFirstStep
          handleSubmit={handleSubmit}
          form={form}
        />
      )
    }

    if (step == 2) {
      return (
        <SignUpSecondStep
          handleSubmit={handleSubmit}
          form={form}
        />
      )
    }

    if (step === 3) {
      return (
        <SignUpThirdStep
          handleSubmit={handleSubmit}
          isPendingValidate={isPendingValidateEmail}
          form={form}
        />
      )
    }

    if (step === 4) {
      return (
        <SignUpFourthStep
          form={form}
          handleSubmit={handleSubmit}
        />
      )
    }
  }

  return (
    <PagelayoutAuth
      right={true}
      pageText={
        <p className="text-xl lg:w-[300px] xl:w-auto 2xl:w-auto text-end">
          Comece sua {" "}
          <span className="text-3xl 2xl:text-4xl text-primary font-bold">
            JORNADA
          </span>
          {" "}
          agora!
        </p>
      }
      pageImage={TreeTravaller}
      imageAlt="3 homens indo em direção à um castelo"
    >
      <div className="w-[320px] lg:w-[384px] flex lg:block justify-center">
        <div className="w-full">
          <form noValidate={true} onSubmit={handleSubmit} className="w-full flex justify-center lg:justify-end">
            <div className="w-[320px] lg:w-[384px] lg:block justify-center">
              <p className="flex justify-center w-full p-[20px] text-foreground text-[20px]">Crie sua conta</p>
              {renderStep(step)}
              <Card className="p-5 flex justify-center mt-5">
                <div>
                  <p className="text-center">Já possui uma conta?</p>
                  <NavLink
                    className="flex text-blue-400 underline text-center justify-center"
                    to="/signin"
                  >
                    Entre aqui
                  </NavLink>
                </div>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </PagelayoutAuth >
  )
}
