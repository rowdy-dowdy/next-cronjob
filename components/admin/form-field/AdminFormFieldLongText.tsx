"use client"
import React, { ChangeEvent } from 'react'

type State = {
  label?: string,
  name?: string
  required?: boolean,
  defaultValue?: string,
  value?: string,
  onChange?: (data: string) => void
  className?: string
}

const AdminFormFieldLongText: React.FC<State> = ({
  label,
  name,
  required = false,
  defaultValue,
  value,
  onChange,
  className
}) => {

  const changeEvent = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        <textarea name={name} value={value} defaultValue={defaultValue} onChange={changeEvent} className="w-full px-4 py-2" rows={4} required={required}></textarea>
      </div>
    </div>
  )
}

export default AdminFormFieldLongText