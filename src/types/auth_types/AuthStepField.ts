import { SelectInputType } from "./SelectInputType"

export type AuthStepFields = {
    fieldId: string
    fieldType: string
    fieldLabel: string
    fieldPlaceholder: string
    equalTo?: string
    selectValues?: SelectInputType[]
    fieldValidator: (value: any) => boolean
}