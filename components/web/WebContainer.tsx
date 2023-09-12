"use client"

import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

const WebContainer = ({
  children, className
}: {
  className?: string,
  children: ReactNode
}) => {
  return (
    <div className={twMerge('w-full max-w-screen-xl mx-auto px-4', className)}>{children}</div>
  )
}

export default WebContainer