import { PagelayoutAuth } from "../../components/PagelayoutAuth";
import Castle from "../../assets/images/castle.png";
import { Link } from "react-router";
import { NavLink } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSignIn } from "./hooks/use-sign-in";

export const SignInPage = () => {
  const {
    states: { errors, isPending },
    actions: { handleSubmit, register },
  } = useSignIn();
  return (
    <div>
      <PagelayoutAuth
        right={false}
        pageText={
          <p className="text-xl lg:w-[300px] xl:w-auto 2xl:w-auto text-end text-foreground ">
            {" "}
            Aprenda,
            <span className="text-3xl 2xl:text-4xl text-primary font-bold">
              CONQUISTE
            </span>
            , evolua
          </p>
        }
        pageImage={Castle}
        imageAlt="Um castelo iluminado"
      >
        <form
          noValidate={true}
          onSubmit={handleSubmit}
          className="w-full flex justify-center lg:justify-end"
        >
          <div className="w-[320px] lg:w-[384px] lg:block justify-center">
            <p className="flex justify-center w-full p-[20px] text-foreground text-[20px]">
              Entre no Athenium
            </p>
            <Card>
              <CardContent className="py-5 px-7 lg:px-10">
                <div className="w-full flex flex-col gap-5">
                  <Input
                    type="email"
                    error={errors.email}
                    placeholder="E-mail"
                    {...register("email")}
                  />
                  <Input
                    type="password"
                    placeholder="Senha"
                    error={errors.password}
                    {...register("password")}
                  />
                  <Button className="p-5 cursor-pointer" isLoading={isPending}>
                    Entrar
                  </Button>
                  <CardFooter className="flex justify-between flex-col lg:flex-row gap-2">
                    <p className="text-foreground text-base">
                      Esqueceu a senha?
                    </p>
                    <Link className="ml-2 text-blue-400 underline" to="">
                      clique aqui
                    </Link>
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
        </form>
      </PagelayoutAuth>
    </div>
  );
};
