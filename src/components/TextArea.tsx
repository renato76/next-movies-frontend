import { FieldHookConfig, useField } from "formik"
import { TextareaHTMLAttributes, ClassAttributes } from "react"

interface OtherProps {
  label: string
}

export const TextArea = ({
  label,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> &
  ClassAttributes<HTMLTextAreaElement> &
  FieldHookConfig<string> &
  OtherProps) => {
  const [field, meta] = useField(props)
  return (
    <div className="mb-2 text-start w-full">
      <label htmlFor={field.name} className="mr-2">
        {label}
      </label>
      <textarea
        type="text"
        className="form-control mt-1 w-full h-[120px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        {...field}
        {...props}
        autoComplete="off"
        rows={4}
        cols={50}
      />
    </div>
  )
}
