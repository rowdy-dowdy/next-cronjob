"use client"

import { FC, SelectHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge";

const WebSelect: FC<SelectHTMLAttributes<HTMLSelectElement>> = (props)  => {
  const { children, ...rest } = props;

  const commonClasses = twMerge(
    `rounded-md border-2 border-gray-100 !bg-white/10 text-gray-100 font-bold text-lg`,
    rest.className
  )

  delete rest.className

  return (
    <div className={`relative ${commonClasses}`}>
      <div className="icon absolute -right-1 top-1/2 -translate-y-1/2 text-[40px]">arrow_drop_down</div>
      <select {...rest} className="!outline-none appearance-none w-full h-full pl-2 pr-10 py-2">{children}</select>
    </div>
  )
}

export default WebSelect