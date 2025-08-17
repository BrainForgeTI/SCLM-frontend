import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/V2/inputs/date-picker"
import { ProfileImageInput } from "@/components/V2/inputs/profile-image-input"
import { Gender } from "@/enums/gender"
import { SignUpType } from "@/schemas/sign-up-schema"
import { Controller, UseFormReturn } from "react-hook-form"

interface SignUpSecondStepProps {
  form: UseFormReturn<SignUpType>
  handleSubmit: () => void
}

export const SignUpSecondStep = ({ form, handleSubmit }: SignUpSecondStepProps) => {

  const { formState: { errors } } = form

  return (
    <Card>
      <CardContent className="py-5 px-10">
        <div className="w-full flex flex-col gap-5">
          <Controller
            name="secondStep.image"
            control={form.control}
            render={({ field }) =>
              <ProfileImageInput
                id="profile-image-picker"
                onChange={field.onChange}
                value={field.value}
                error={errors.secondStep?.image}
              />
            }
          />

          <Controller
            name="secondStep.birthDate"
            control={form.control}
            render={({ field }) => <DatePicker error={errors.secondStep?.birthDate} placeholder="Data de nascimento" value={field.value} onChange={field.onChange} />}
          />

          <Controller
            name="secondStep.gender"
            control={form.control}
            render={({ field }) =>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full" error={errors.secondStep?.gender}>
                  <SelectValue placeholder="Gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={Gender.MALE}>Masculino</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Feminino</SelectItem>
                    <SelectItem value={Gender.NON_BINARY}>Não binário</SelectItem>
                    <SelectItem value={Gender.OTHER}>Outro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            }
          />
          <Button onClick={handleSubmit} type="button" className="p-5 cursor-pointer">Próximo</Button>
        </div>
      </CardContent>
    </Card>
  )
}
