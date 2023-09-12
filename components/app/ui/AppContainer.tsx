"use client"

import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

const AppContainer = ({
  children, className
}: {
  className?: string,
  children: ReactNode
}) => {
  return (
    <div className={twMerge('w-full max-w-screen-2xl mx-auto px-4', className)}>{children}</div>
  )
}

export default AppContainer