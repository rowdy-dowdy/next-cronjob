import WebRootLayout from "@/components/web/layouts/WebRootLayout"
import { ReactNode } from "react"

const layout = async ({children}: {children: ReactNode}) => {
  return (
    <WebRootLayout children={children} />
  )
}

export default layout