import { AuthStepFields } from "./AuthStepField"

export type AuthStepType = {
    title: string
    step: number
    showReturn: boolean
    buttonLabel: string
    validStep: boolean
    fields: AuthStepFields[]
}