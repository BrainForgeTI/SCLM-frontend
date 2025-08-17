import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import React from "react"
import { FieldError } from "react-hook-form"

interface DatePickerProps {
  value?: Date
  placeholder?: string
  error?: FieldError
  onChange: (date?: Date) => void
}

export const DatePicker = ({ onChange, value, placeholder, error }: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild >
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between font-normal",
              error && "border !border-destructive"
            )}
          >
            {date ? date.toLocaleDateString() : placeholder}
            < ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <p className="text-destructive text-end mt-2">{error?.message}</p>
        < PopoverContent className="w-auto overflow-hidden p-0" align="start" >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              onChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover >
    </div>
  )
}
