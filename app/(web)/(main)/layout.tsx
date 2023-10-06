import WebRootLayout from "@/components/web/layouts/WebRootLayout"
import { Nunito } from "next/font/google"
import { ReactNode } from "react"

export const nunito = Nunito({
  weight: ['900', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

const layout = async ({children}: {children: ReactNode}) => {
  return (
    <WebRootLayout className={nunito.className} children={children} />
  )
}

export default layout