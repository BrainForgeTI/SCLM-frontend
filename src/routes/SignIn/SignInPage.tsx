import { AuthFormsBox, AuthFormsInput, PagelayoutAuth } from "../../components/PagelayoutAuth";
import Castle from "../../assets/images/castle.png";
import { useEffect, useState } from "react";
import { AuthStepFields } from "../../types/auth_types/AuthStepField";
import { ChangeEvent } from "react"
import { Link } from "react-router";
import { NavLink } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const SignInPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  function handleInputValue(event: ChangeEvent<HTMLInputElement>, fieldId: string) {

    setLoginForm((prev) => ({
      ...prev,
      [fieldId]: event.target.value
    }))
  }
  const [emailValue, setEmailValue] = useState<AuthStepFields>(
    {
      fieldId: "email",
      fieldLabel: "Email",
      fieldPlaceholder: "Seu Email",
      fieldType: "email",
      fieldValidator: () => { return true }
    }
  )

  const [senhaValue, setSenhaValue] = useState<AuthStepFields>(
    {
      fieldId: "password",
      fieldLabel: "Senha",
      fieldPlaceholder: "Sua Senha",
      fieldType: "password",
      fieldValidator: () => { return true }
    }
  )
  useEffect(() => {
    console.log(loginForm)
  }, [loginForm])
  return (<div>

    <PagelayoutAuth
      right={false}
      pageText={
        <p className="text-xl lg:w-[300px] xl:w-auto 2xl:w-auto text-end text-foreground "> Aprenda,
          <span className="text-3xl 2xl:text-4xl text-primary font-bold">CONQUISTE</span>, evolua
        </p>
      }
      pageImage={Castle}
      imageAlt="Um castelo iluminado"
    >
      <div className="w-full flex justify-center lg:justify-end">
        <div className="w-[320px] lg:w-[384px] lg:block justify-center">
          <p className="flex justify-center w-full p-[20px] text-foreground text-[20px]">Entre no Scholarium</p>
          <Card>
            <CardContent className="py-5 px-7 lg:px-10">
              <div className="w-full flex flex-col gap-5">
                <Input
                  type={emailValue.fieldType}
                  id={emailValue.fieldId}
                  placeholder={emailValue.fieldPlaceholder}
                  onChange={() => { }}
                />
                <Input
                  id={senhaValue.fieldId}
                  type={senhaValue.fieldType}
                  placeholder={senhaValue.fieldPlaceholder}
                />
                <Button className="p-5">Entrar</Button>
                <CardFooter className="flex justify-between flex-col lg:flex-row gap-2">
                  <p className="text-foreground text-base">Esqueceu a senha?</p>
                  <Link className="ml-2 text-blue-400 underline" to="">clique aqui</Link>
                </CardFooter>
              </div>
            </CardContent>

          </Card>
          <Card className="p-5 flex justify-center mt-5">
            <div>
              <p className="text-center">Ainda não tem uma conta?</p>
              <NavLink
                className="flex text-blue-400 underline text-center justify-center"
                to="/signup"
              >
                Crie gratuitamente aqui
              </NavLink>
            </div>
          </Card>
        </div>
      </div>
    </PagelayoutAuth>
  </div>

  );
}

