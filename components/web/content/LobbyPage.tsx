"use client"

import Image from "next/image"
import WebButton from "../ui/WebButton"

const LobbyPage = () => {
  return (
    <>
      <style jsx global>{`
        html, body {
          --bg-from: #c026d3;
          --bg-to: #4f46e5;
        }
      `}</style>

      <WebButton href="/" variant="outlined" icon={<span className="icon-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path></svg>
      </span>} className="absolute top-5 left-5" >Quay về</WebButton>

      <div className="flex flex-col">
        <div className="flex-none flex flex-col items-center justify-center space-y-2">
          <Image src="/images/logo.svg" alt="logo" width={200} height={200} className="h-20 w-auto" />
        </div>
      </div>

      <div className="flex-grow min-h-0"></div>
    </>
  )
}

export default LobbyPage