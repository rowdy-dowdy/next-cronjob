"use client"
import { animate, motion, motionValue, useMotionValue } from "framer-motion";
import Image from "next/image"
import { useEffect } from "react";
import WebInput from "../form/WebInput";
import WebButton from "../form/WebButton";

const StartPage = () => {

  const strokeDasharray = useMotionValue(`calc(0 * 31.4 / 100) 31.4`)

  useEffect(() => {
    const anim = animate(strokeDasharray, `calc(100 * 31.4 / 100) 31.4`, { 
      duration: 60
    })

    return () => {
      anim.stop()
      anim.cancel()
    }
  }, [])
  
  return (
    <>
      <style jsx global>{`
        html, body {
          --bg-from: #fb923c;
          --bg-to: #ec4899;
          --text: #c35756;
          --text2: #bf446e;
        }
      `}</style>

      <div className="absolute top-4 left-4 text-center">
        <div className="text-3xl">1/9</div>
        <div className="p-1 rounded-full bg-gray-200 flex items-center mt-2">
          <div className="w-5 h-5 p-1 rounded-full bg-[--text] icon text-gray-200 icon-600 !text-lg">check</div>
          <p className="px-4 text-[--text] leading-none">4/9</p>
        </div>
      </div>

      <div className="absolute right-4 top-4 w-14 h-14 border-4 p-0.5 rounded-full">
        <span className="icon-svg w-full h-full">
          <svg height="20" width="20" viewBox="0 0 20 20">
            <circle r="9" cx="10" cy="10" fill="currentColor" />
            <motion.circle r="5" cx="10" cy="10" fill="transparent"
              stroke="var(--text2)"
              strokeWidth="10"
              style={{ strokeDasharray }}
              strokeDasharray="calc(0 * 31.4 / 100) 31.4"
              transform="rotate(-90) translate(-20)" />
          </svg>
        </span>
      </div>

      <div className="w-full h-full flex flex-col space-y-6">
        <div className="flex-none flex flex-col items-center justify-center space-y-2">
          <Image src="/images/logo.svg" alt="logo" width={200} height={200} className="h-20 w-auto" />
        </div>
        <div className="flex-grow min-h-0 flex flex-col justify-center space-y-4">
          <Image src="/images/phone.svg" alt="phone" width={200} height={200} className="h-40 w-auto" />
          <p className="text text-teal-300 text-3xl text-center">Nhập một câu</p>
          <div className="flex space-x-3 px-28">
            <WebInput className="flex-grow min-w-0" placeholder="Chim cánh cụt" />
            <WebButton href="/draw" className="flex-none" icon={<span className="icon-svg w-6 h-6"><img src="/images/ic_ready.svg" /></span>}>Xong</WebButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default StartPage