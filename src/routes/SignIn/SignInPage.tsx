import { AuthFormsBox, AuthFormsInput, PagelayoutAuth } from "../../components/PagelayoutAuth";
import Castle from "../../assets/images/castle.png";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react"
import { NavLink, useNavigate } from "react-router";
import { useApi } from "../../hooks/useApi";
import { useSessionStore } from "../../store/session-store";

export const SignInPage = () => {
    const [loginForm,setLoginForm] = useState({
        email:"",
        password:""
    })

    const api = useApi()
    const navigate = useNavigate()
    const sessionStore = useSessionStore()

    function handleInputValue(event:ChangeEvent<HTMLInputElement>,fieldId:string){

        setLoginForm((prev)=>({
            ...prev,
            [fieldId]:event.target.value
        }))
    }

    const emailValue =
        {
            fieldId:"email",
            fieldLabel:"Email",
            fieldPlaceholder:"Seu Email",
            fieldType:"email",
            fieldValidator:()=>{return true}
        }

    const senhaValue = 
        {
            fieldId:"password",
            fieldLabel:"Senha",
            fieldPlaceholder:"Sua Senha",
            fieldType:"password",
            fieldValidator:()=>{return true}
        }

    const handleLogin = async () => {
        const result = await api.signIn(loginForm.email, loginForm.password)
        if (result.status === 200) {
            const firstName = result.data.first_name
            sessionStore.setSession(firstName, '', '')
            navigate('/home')
        }
    }

    useEffect(()=>{
        console.log(loginForm)
    },[loginForm])
    return (<div>
    
            <PagelayoutAuth right={false} pageText={<p className="text-xl lg:w-[300px] xl:w-auto 2xl:w-auto text-end "> Aprenda, <span className="text-3xl 2xl:text-4xl text-primary font-bold">CONQUISTE,</span> evolua </p>} pageImage={Castle} imageAlt="Um castelo iluminado">
                <div className="w-full flex justify-center lg:justify-end">
                    <div className="w-[320px] lg:w-[384px] lg:block justify-center">
                        <p className="flex justify-center w-full p-[20px] text-white text-[20px]">Entre no Scholarium</p>
                        <AuthFormsBox>
                            <div className="w-full flex flex-col gap-5">
                                <AuthFormsInput type={emailValue.fieldType} id={emailValue.fieldId} label={emailValue.fieldLabel} placeholder={emailValue.fieldPlaceholder} value={loginForm.email} handleInputValue={handleInputValue}></AuthFormsInput>
                                <AuthFormsInput type={senhaValue.fieldType} id={senhaValue.fieldId} label={senhaValue.fieldLabel} placeholder={senhaValue.fieldPlaceholder} value={loginForm.password} handleInputValue={handleInputValue}></AuthFormsInput>
                                <button onClick={handleLogin} type="button" className="text-white w-full p-[10px] bg-primary rounded-lg cursor-pointer">Entrar</button>
                                <p className="flex justify-center w-full text-white text-[12px]">Esqueceu a senha?<a className="flex ml-2 text-blue-400 underline" href="">clique aqui</a></p>
                            </div>
                            
                        </AuthFormsBox>
                        <div className="flex flex-col w-full mt-6 p-[15px] rounded-[20px] text-white justify-items-center text-center bg-neutral/5">
                            <p>Ainda não tem uma conta?</p>
                            <NavLink className="flex text-blue-400 underline text-center justify-center" to="/signup">Crie gratuitamente aqui</NavLink>
                        </div>
                    </div>
                </div>
            </PagelayoutAuth>
        </div>
        
        );
}

