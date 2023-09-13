"use client"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import styles from "./screen.module.css";
import { motion } from "framer-motion";
import { useResizeObserver } from "@/lib/utils/clickOutside";
import Image from "next/image";

const WebRootLayout = ({ children }: {
  children: ReactNode
}) => {
  // socket io
  const socketRef = useRef<Socket>()

  const socketInitializer = async () => {
    // await fetch('/api/socket')
    
    socketRef.current = io(process.env.NEXT_PUBLIC_SITE_URL|| "", {
      path: '/api/socket',
      addTrailingSlash: false,
    })

    socketRef.current.on('connect', () => {
      console.log('Connected', socketRef.current?.id)
    })
  }

  useEffect(() => {
    // socketInitializer()
  }, [])

  // auto resize
  const screenEl = useRef<HTMLDivElement>(null)

  const updateRectangleSize = useCallback((rootEl: HTMLDivElement, entry: ResizeObserverEntry) => {
    if (!screenEl.current) return

    const windowWidth = entry.borderBoxSize?.[0].inlineSize || window.innerWidth
    const windowHeight = entry.borderBoxSize?.[0].blockSize || window.innerHeight
    const margin = 30

    const scaleX = (windowWidth - 2 * margin) / screenEl.current.offsetWidth
    const scaleY = (windowHeight - 2 * margin) / screenEl.current.offsetHeight
    const scale = Math.min(scaleX, scaleY)
    screenEl.current.style.transform = `scale(${scale})`
  }, [])

  const rootEl = useResizeObserver(updateRectangleSize)

  return (
    <>
      <div ref={rootEl} className="relative w-full h-screen overflow-hidden bg-gradient-to-tr from-rose-500 to-violet-600">
        <div className="absolute w-full h-full bg-black/25"></div>
        <img src="https://garticphone.com/images/textura.png" alt="" className="absolute w-full h-full" />

        <div 
          ref={screenEl} 
          className={`${styles.screen} text-gray-200 flex flex-col space-y-6`}
        >
          <div className="flex-none flex flex-col items-center justify-center space-y-2">
            <Image src="/images/logo.svg" alt="logo" width={200} height={200} className="h-28 w-auto" />
            <div className="text uppercase font-semibold">Tam sao thất bản</div>
          </div>

          <div className="flex-grow min-h-0 flex space-x-6">
            <div className="w-3/5 rounded-lg border-[3px] border-[--border] p-4"></div>
            <div className="w-2/5 rounded-lg border-[3px] border-[--border] p-4 text-center">
              <div className="text text-xl font-semibold text-teal-300 uppercase">Cách chơi</div>
              <style jsx>{`
                .loader {
                  
                }
              `}</style>
              <div className="icon-svg w-7 h-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="20" fill="none" stroke-linecap="round">
                    <animate attributeName="stroke-dasharray" from="0 565.48" to="565.48 0" dur="2s" />
                  </circle>
                </svg>
              </div>

            </div>
          </div>

          <div className="flex-none flex items-center justify-between text-white/50 font-semibold">
            <Image src="/logo.png" alt="logo" width={200} height={200} className="h-10 w-auto" />
            <span>© 2023 <a href="https://github.com/rowdy-dowdy" target="_blank" className="hover:text-blue-600">Việt Hùng Ít</a>. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default WebRootLayout