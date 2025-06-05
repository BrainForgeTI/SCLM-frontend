import { AuthFormsBox, PagelayoutAuth } from "../../components/PagelayoutAuth";
import TreeTravaller from "../../assets/images/treeTravallers.png";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SignUpFormType } from "../../types/auth_types/SignUpFormType";
import { BackStepButton, AuthSubmitButton, AuthChooseInput, AuthPasswordStatus, AuthAcceptTermsInput, AuthCodeInput } from "./index";
import { AuthStepType } from "../../types/auth_types/AuthStepType";
import { Validator } from "../../utils/validator";
import { PasswordStatus } from "../../types/auth_types/PasswordStatus";
import { useApi } from "../../hooks/useApi";
import { redirect, redirectDocument } from "react-router";

export const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState({
    step: 0,
  });

  const [signUpForm, setSignUpForm] = useState<SignUpFormType>({
    firstName: '',
    lastName: '',
    userName: '',
    profileImage: null,
    dateOfBirth: new Date('2000-09-03').toISOString().split("T")[0],
    gender: 'Masculino',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  });

  const [timeToNextEmailCode, setTimeToNextEmailCode] = useState(60)
  const validateCodesRef: React.RefObject<HTMLInputElement | null>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]



  const [steps, setSteps] = useState<AuthStepType[]>([
    {
      title: 'Crie sua conta',
      step: 0,
      showReturn: false,
      buttonLabel: 'Próximo',
      validStep: false,
      fields: [
        { fieldId: 'firstName', fieldType: 'text', fieldLabel: "Primeiro nome", fieldPlaceholder: 'Seu nome', fieldValidator: (value: string) => { return !validator.emptyString(value) } },
        { fieldId: 'lastName', fieldType: 'text', fieldLabel: "Último nome", fieldPlaceholder: 'Seu sobrenome', fieldValidator: (value: string) => { return !validator.emptyString(value) } },
        { fieldId: 'userName', fieldType: 'text', fieldLabel: "Nome de usuário", fieldPlaceholder: 'Seu nome de usuário', fieldValidator: (value: string) => { return validator.validateUsername(value) } }
      ]
    },
    {
      title: 'Informações pessoais',
      step: 1,
      showReturn: true,
      buttonLabel: 'Próximo',
      validStep: false,
      fields: [
        { fieldId: 'profileImage', fieldType: 'file', fieldLabel: "", fieldPlaceholder: '', fieldValidator: (value: File) => { return validator.validateImagUpload(value) } },
        { fieldId: 'dateOfBirth', fieldType: 'date', fieldLabel: "Data de nascimento", fieldPlaceholder: 'Data de aniversário', fieldValidator: (value: string) => { return validator.validateDate(value) } },
        { fieldId: 'gender', fieldType: 'select', fieldLabel: "Gênero", fieldPlaceholder: 'Gênero', selectValues: [{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }, { label: 'Outro', value: 'other' }], fieldValidator: (value: any) => { return !validator.emptyString(value) } }
      ]
    },
    {
      title: 'Informações de acesso',
      step: 2,
      showReturn: true,
      buttonLabel: 'Confirmar cadastro',
      validStep: false,
      fields: [
        { fieldId: 'email', fieldType: 'email', fieldLabel: "E-mail", fieldPlaceholder: 'Seu email', fieldValidator: (value: string) => { return validator.validateEmail(value) } },
        { fieldId: 'password', fieldType: 'password', fieldLabel: "Senha", fieldPlaceholder: 'Sua senha', fieldValidator: (value: any) => { return validator.validatePassword(value) } },
        { fieldId: 'confirmPassword', equalTo: 'password', fieldType: 'password', fieldLabel: "Confirmar senha", fieldPlaceholder: 'Confirme a senha', fieldValidator: (value: any) => { return equalPassword(value[0], value[1]) } }
      ]
    },
    {
      title: 'Confirme o seu E-mail',
      step: 3,
      showReturn: false,
      buttonLabel: 'Validar',
      validStep: false,
      fields: [
        { fieldId: 'code1', fieldType: 'text', fieldLabel: "", fieldPlaceholder: '0', fieldValidator: (value: any) => { return !validator.emptyString(value) } },
        { fieldId: 'code2', fieldType: 'text', fieldLabel: "", fieldPlaceholder: '0', fieldValidator: (value: any) => { return !validator.emptyString(value) } },
        { fieldId: 'code3', fieldType: 'text', fieldLabel: "", fieldPlaceholder: '0', fieldValidator: (value: any) => { return !validator.emptyString(value) } },
        { fieldId: 'code4', fieldType: 'text', fieldLabel: "", fieldPlaceholder: '0', fieldValidator: (value: any) => { return !validator.emptyString(value) } }
      ]
    }
  ]);

  const [passwordStatus, setPasswordStatus] = useState<PasswordStatus>({
    hasMinLength: false,
    hasSpecialCharacter: false,
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
  })

  const validator: Validator = new Validator();

  function handleSignUpFormInput(event: ChangeEvent<HTMLInputElement>, field: string) {
    setSignUpForm((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  }

  function handleSignUpImageInput(event: ChangeEvent<HTMLInputElement>, field: string) {
    if (event.target.files && event.target.files.length > 0) {

      setSignUpForm((prev) => ({
        ...prev,
        [field]: event.target.files![0]
      }));
    }
  }

  function handleCodeInput(event: ChangeEvent<HTMLInputElement>, field: string, index: number) {
    if (signUpForm[field].length === 1 && event.target.value !== '') return

    if (event.target.value === '') {
      if (index > 0 && validateCodesRef[index - 1].current) {
        validateCodesRef[index - 1].current?.focus();
      }
    } else {
      if (index < validateCodesRef.length - 1 && validateCodesRef[index + 1].current) {
        validateCodesRef[index + 1].current?.focus();
      }
    }

    setSignUpForm((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  }

  function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>, field: string) {
    setSignUpForm((prev) => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  function checkAndSetValidStep(step: number) {
    const foundStep = steps.find((item) => item.step == step)
    if (foundStep) {
      const fields = foundStep.fields;

      let validFieldsAtThisStep = true;

      for (let field of fields) {
        if (field.equalTo) {
          if (!field.fieldValidator([signUpForm[field.fieldId], signUpForm[field.equalTo]])) {
            validFieldsAtThisStep = false;
            break;
          }
        } else {
          if (!field.fieldValidator(signUpForm[field.fieldId])) {
            validFieldsAtThisStep = false;
            break;
          }
        }
      }

      if (!signUpForm.terms && step == 2) {
        validFieldsAtThisStep = false
      }

      setSteps((prev) =>
        prev.map((item) => item.step === step ? { ...item, validStep: validFieldsAtThisStep } : item)
      )
    }
  }

  const api = useApi();
  async function goToNextStep() {
    if (currentStep.step < 3) {
      if (currentStep.step === 2) {
        const { email } = signUpForm;
        await api.validateEmail(email);
      }
      if (steps[currentStep.step].validStep) {
        setCurrentStep({ step: currentStep.step + 1 })
      }
    } else if (currentStep.step === 3) {
      const code = `${signUpForm.code1}${signUpForm.code2}${signUpForm.code3}${signUpForm.code4}`;
      const { email } = signUpForm;
      if (await api.validateToken(email, code)) {
        if (steps[currentStep.step].validStep) {
          await api.signup(signUpForm);
          console.log('opa, deu bom')
          window.location.replace('/home');
        } else {
          throw new Error('Reiniciar o processo de cadastro');
        }
      }
    } else {
      console.log("ir validar")
      //chamar validação de código e redirecionar para a home já com código jwt
    }
  }

  function backStep() {
    if (currentStep.step > 0) {
      setCurrentStep((prev) => ({ ...prev, step: currentStep.step - 1 }))
    }
  }

  function equalPassword(password1: string, password2: string) {
    if (password1.length != 0 && password2.length != 0) {
      return password1 === password2
    }

    return false
  }

  function timeToNextCode() {
    let codeTime = 60
    const interval = setInterval(() => {
      if (codeTime > 0) {
        codeTime -= 1;
        setTimeToNextEmailCode(codeTime);
      } else {
        clearInterval(interval)
      }
    }, 1000);
  }

  function sendOtherEmailCode() {
    //chamar api
    timeToNextCode();
  }


  useEffect(() => {
    checkAndSetValidStep(0);
    checkAndSetValidStep(1);
    checkAndSetValidStep(2);
    checkAndSetValidStep(3);
  }, [signUpForm])

  useEffect(() => {
    setPasswordStatus({
      hasMinLength: validator.validatePasswordMinLength(signUpForm.password),
      hasSpecialCharacter: validator.validateHasSpecialCharacter(signUpForm.password),
      hasNumber: validator.validateHasNumber(signUpForm.password),
      hasUppercase: validator.validateHasUppercase(signUpForm.password),
      hasLowercase: validator.validateHasLowercase(signUpForm.password),
    })
  }, [signUpForm.password])

  useEffect(() => {
    if (currentStep.step === 3) {
      timeToNextCode()
    }
  }, [currentStep.step])


  return (
    <PagelayoutAuth right={true} pageText={<p className="text-xl lg:w-[300px] xl:w-auto 2xl:w-auto text-end"> Comece sua <span className="text-3xl 2xl:text-4xl text-primary font-bold">JORNADA</span> agora! </p>} pageImage={TreeTravaller} imageAlt="3 homens indo em direção à um castelo">
      <div className="w-[320px] lg:w-[384px] flex lg:block justify-center">
        <div className="w-full">
          <h1 className="text-base-content text-[20px] font-medium text-center mb-5">{steps[currentStep.step].title}</h1>

          <AuthFormsBox>
            <div className="w-full flex flex-col gap-5">
              {
                steps[currentStep.step].showReturn ? <BackStepButton action={backStep} /> : <></>
              }

              {
                currentStep.step === 0 || currentStep.step === 1 || currentStep.step === 2 ?
                  <>
                    {
                      steps[currentStep.step].fields.map((step, index) => {
                        return (
                          <>
                            {
                              step.fieldType !== 'file' ?
                                <AuthChooseInput key={`map-input-${index}`} form={signUpForm} step={step} index={index} handleInput={handleSignUpFormInput} />
                                :
                                <AuthChooseInput key={`map-input-${index}`} form={signUpForm} step={step} index={index} handleInput={handleSignUpImageInput} />
                            }

                          </>
                        )
                      })
                    }

                    {
                      currentStep.step === 2 ?
                        <>
                          <ul className="w-full flex flex-col gap-3">
                            <li key='min-character' className="w-full ps-3">
                              <AuthPasswordStatus label="Mínimo de 8 caracteres" status={passwordStatus.hasMinLength} />
                            </li>
                            <li key='special-character' className="w-full ps-3">
                              <AuthPasswordStatus label="Pelo menos um carácter especial." status={passwordStatus.hasSpecialCharacter} />
                            </li>
                            <li key='has-number' className="w-full ps-3">
                              <AuthPasswordStatus label="Pelo menos um número." status={passwordStatus.hasNumber} />
                            </li>
                            <li key='has-uppercase' className="w-full ps-3">
                              <AuthPasswordStatus label="Pelo menos uma letra maiúscula." status={passwordStatus.hasUppercase} />
                            </li>
                            <li key='has-lowercaase' className="w-full ps-3">
                              <AuthPasswordStatus label="Pelo menos uma letra minúscula." status={passwordStatus.hasLowercase} />
                            </li>
                          </ul>
                        </>
                        :
                        <></>
                    }
                  </>

                  :
                  <></>
              }

              {
                currentStep.step === 3 ?
                  <div className="text-base-content">
                    <h2 className="text-center text-[16px] font-medium">Código de confirmação</h2>
                    <p className="text-base-content/70 text-[14px] text-center mt-5">Enviamos um código de confirmação para o email informado anteriormente. Digite o código abaixo para validar sua conta. Outro código poderá ser gerado após 1 minuto.</p>

                    <div className="w-full flex justify-center gap-3 mt-8">
                      {
                        steps[3].fields.map((step, index) => {
                          return <AuthCodeInput form={signUpForm} id={step.fieldId} ref={validateCodesRef[index]} step={step} value={signUpForm[step.fieldId]} index={index} handleInput={handleCodeInput} key={`code-${step.fieldId}`} />
                        })
                      }
                    </div>

                  </div>
                  :
                  <></>
              }


              <div className="w-full mt-3">
                {
                  currentStep.step == 2 ?
                    <AuthAcceptTermsInput id="terms" value={signUpForm.terms} handleInput={handleCheckbox} />
                    :
                    <></>
                }
                <AuthSubmitButton action={goToNextStep} label={steps[currentStep.step].buttonLabel} styles={steps[currentStep.step].validStep ? 'bg-primary text-primary-content border-transparent mt-6 text-[18px]' : 'mt-6 bg-primary/0 border-primary-content/50 text-primary-content/50 text-[18px]'} disabled={steps[currentStep.step].validStep} />

                {
                  currentStep.step === 3 ?
                    <AuthSubmitButton action={sendOtherEmailCode} label={`Enviar outro código (${timeToNextEmailCode}s)`} disabled={timeToNextEmailCode === 0 ? true : false} styles={`${timeToNextEmailCode === 0 ? 'bg-primary/50 text-primary-content border-transparent mt-6' : 'mt-6 bg-primary/0 border-primary-content/50 text-primary-content/50'} text-[12px]`} />
                    :
                    <></>
                }
              </div>

            </div>
          </AuthFormsBox>
        </div>
      </div>
    </PagelayoutAuth >
  );
}

