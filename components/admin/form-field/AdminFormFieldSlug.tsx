"use client"
import { FC } from 'react'
import slugify from 'slugify'

type State = {
  label?: string,
  name?: string
  required?: boolean,
  defaultValue?: string,
  value?: string,
  placeholder?: string,
  onChange?: (value: string) => void
  className?: string
}

const AdminFormFieldSlug: FC<State> = ({
  label,
  name,
  required = false,
  defaultValue,
  value,
  onChange,
  className,
  placeholder
}) => {
 
  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempSlugValue = slugify(e.target.value, {
      replacement: '_',
      lower: true,
      locale: 'vi',
      trim: false
    })

    if (!value) {
      e.target.value = tempSlugValue
    }

    if (typeof onChange == 'function') {
      console.log(typeof value)
      onChange(tempSlugValue)
    }
  }

  return (
    <div className={className}>
      { label
        ? <p className="text-sm font-medium mb-1 capitalize">{label} { required && <span className="text-red-500">*</span> }</p>
        : null
      }
      <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
        <input type='text' name={name} value={value} defaultValue={defaultValue} onChange={(e) => changeEvent(e)} className="w-full px-4 py-2" placeholder={placeholder} required={required} />
      </div>
    </div>
  )
}

export default AdminFormFieldSlug