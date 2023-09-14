"use client"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import styles from "./screen.module.css";
import { motion } from "framer-motion";
import { useResizeObserver } from "@/lib/utils/clickOutside";

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
  const screenElWidth = 1082
  const screenElHeight = 698

  const updateRectangleSize = useCallback((rootEl: HTMLDivElement, entry: ResizeObserverEntry) => {
    if (!screenEl.current) return

    const windowWidth = entry.borderBoxSize?.[0].inlineSize || window.innerWidth
    const windowHeight = entry.borderBoxSize?.[0].blockSize || window.innerHeight
    const margin = 30

    const scaleX = (windowWidth - 2 * margin) / screenElWidth
    const scaleY = (windowHeight - 2 * margin) / screenElHeight
    const scale = Math.min(scaleX, scaleY)
    screenEl.current.style.transform = `scale(${scale})`
  }, [])

  // const rootEl = useRef(null)
  const rootEl = useResizeObserver(updateRectangleSize)

  return (
    <>
      <style jsx global>{`
        html, body {
          width: 100%;
          height: 100%;
          --bg-from: #f43f5e;
          --bg-to: #7c3aed;
        }
      `}</style>

      <div ref={rootEl} className="relative overflow-hidden bg-gradient-to-tr from-[--bg-from] to-[--bg-to] transition-colors"
        style={{width: '100%', height: '100%'}}
      >
        <div className="absolute w-full h-full bg-black/20"></div>
        <img src="https://garticphone.com/images/textura.png" alt="" className="absolute w-full h-full" />

        <div 
          ref={screenEl} 
          className={`${styles.screen} absolute top-1/2 left-1/2 rounded-xl p-5 text-gray-100 select-none overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default WebRootLayout