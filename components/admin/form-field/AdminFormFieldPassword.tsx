"use client"
import React from 'react'

type State = {
  label?: string | null,
  name?: string
  required?: boolean | null,
  defaultValue?: string,
  value?: string,
  onChange?: (data: string) => void
  className?: string
}

const AdminFormFieldPassword: React.FC<State> = ({
  label,
  name,
  required = false,
  value,
  onChange,
  className
}) => {

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange == 'function') 
      onChange(e.target.value)
  }

  return (
    <div className={className}>
      { label
        ? <p className="text-sm font-medium mb-1 capitalize">{label} { required && <span className="text-red-500">*</span> }</p>
        : null
      }
      <div className="border rounded focus-within:ring-2 ring-blue-500 bg-white">
        <input type='password' name={name} value={value} onChange={(e) => changeEvent(e)} className="w-full px-4 py-2" required={required || false} />
      </div>
    </div>
  )
}

export default AdminFormFieldPassword