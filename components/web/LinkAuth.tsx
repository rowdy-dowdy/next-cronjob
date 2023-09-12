"use client"

import useWebModalStore from "@/stores/web/webModel"
import Link, { LinkProps } from "next/link"
import { FC, MouseEvent, ReactNode } from "react"

interface Props extends LinkProps<HTMLButtonElement> {
  children: ReactNode; // ReactNode cho phép bạn truyền bất kỳ nội dung con nào
}

const LinkAuth: FC<Props> = ({ children, ...rest }) => {

  const { setShowLoginModal } = useWebModalStore()

  const handelClick = (e: MouseEvent) => {
    if (typeof rest.href === 'string' && rest.href.split('/').includes('practice')) {
      setShowLoginModal(true)
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <Link {...rest}>{children}</Link>
  )
}

export default LinkAuth