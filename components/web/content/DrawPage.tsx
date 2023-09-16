"use client"

import { animate, useMotionValue, motion } from "framer-motion"
import Image from "next/image";
import { useEffect, useRef, useState, MouseEvent } from "react";
import WaitTime from "../ui/WaitTime";
import WebButton from "../form/WebButton";
import { Slider } from "@mui/material";

const COLORS = ["#09090b",  "#737373",  "#ef4444", "#fff", "#d4d4d8", "#f97316", 
  "#eab308", "#b91c1c", "#c2410c", "#a16207", "#84cc16", "#14b8a6",
  "#22c55e", "#3b82f6", "#8b5cf6", "#15803d", "#1d4ed8", "#4338ca", 
  "#d946ef", "#ec4899", "#f43f5e"]

const TOOLS = ["draw", "ink_eraser", "square", "circle", "pen_size_2", "colorize", "turn_slight_left", "turn_slight_right"]

const DrawPage = () => {
  const [colorCurrent, setColorCurrent] = useState(COLORS[0])
  const [toolCurrent, setToolCurrent] = useState(TOOLS[0])

  const canvasEl = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasOffset = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    if (!canvasEl.current) return

    canvasEl.current.width = canvasEl.current.offsetWidth
    canvasEl.current.height = canvasEl.current.offsetHeight
  }, [])

  useEffect(() => {
    if (!canvasEl.current) return

    const ctx = canvasEl.current.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = colorCurrent
    ctx.strokeStyle = colorCurrent
  }, [colorCurrent])

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasEl.current) return

    const ctx = canvasEl.current.getContext('2d') as CanvasRenderingContext2D
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.lineJoin = 'round'

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x+1, y+1)
    ctx.stroke()

    canvasOffset.current = {x, y}

    setIsDrawing(true)
  }

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasEl.current) return

    const canvas = canvasEl.current
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    ctx.beginPath()
    ctx.moveTo(canvasOffset.current.x, canvasOffset.current.y)
    ctx.lineTo(x, y)
    ctx.stroke()

    canvasOffset.current = {x, y}
  }

  const handleMouseUp = () => {
    if (!canvasEl.current) return

    const ctx = canvasEl.current.getContext('2d') as CanvasRenderingContext2D
    ctx.stroke()
    ctx.beginPath()

    setIsDrawing(false)
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          --bg-from: #e0453c;
          --bg-to: #eb498c;
        }
      `}</style>

      <div className="absolute top-4 left-4 text-center text-5xl">1/9</div>

      <WaitTime className="absolute right-4 top-4" duration={120} color="#ba3a64" />
      
      <div className="h-full flex space-x-4 items-center">
        <div className="w-36 flex-none bg-black/30 flex flex-wrap -mx-1 p-2 rounded-lg">
          { COLORS.map((v,i) =>
            <div key={i} className="w-1/3 px-1 mb-2">
              <div 
                className="w-full aspect-square rounded-lg border-2 border-black/50 cursor-pointer"
                style={{ backgroundColor: v }}
                onClick={() => setColorCurrent(v)}
              ></div>
            </div>
          )}
          <div 
            className="w-full aspect-[2/1] rounded-lg border-2 border-black/50"
            style={{ backgroundColor: colorCurrent }}
          ></div>
        </div>

        <div className="flex-grow min-w-0 h-full flex flex-col space-y-4">
          <div className="flex-grow min-h-0 rounded-lg border-b-4 border-black/50 bg-gradient-to-r from-indigo-800/70 to-indigo-700/70 flex flex-col"
            style={{ boxShadow: 'inset 0px 2px 0px 0px rgba(255,255,255,.15), 0px 3px 0px 0px rgba(255,255,255,0.15)'}}
          >
            <div className="flex-none w-full text-center flex flex-col items-center">
              <div className="p-2 bg-black/40 rounded-b-lg">
                <Image src="/logo.png" alt="logo" width={200} height={200} className="h-8 w-auto" />
              </div>
              <p className="text2 text-teal-300 uppercase mt-2">Này, đã đến giờ vẽ rồi!</p>
              <p className="text text-2xl uppercase">Điện thoại</p>
            </div>
            <div className="flex-grow min-h-0 border-t-2 border-white/30 mt-4 p-2 bg-black/30">
              <canvas
                ref={canvasEl}
                className="w-full h-full rounded-b-lg overflow-hidden bg-white"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              ></canvas>
            </div>
          </div>

          <div className="flex-none flex space-x-4 items-center">
            <div className="flex-grow bg-black/30 rounded-lg p-2 flex space-x-2">
              <div className="w-1/2 rounded-lg border-2 border-white/40 p-1.5">
                <div 
                  className={`w-8 h-8 rounded-full border-2 text-white/40 border-current cursor-pointer grid place-items-center
                    ${toolCurrent == '' ? '!text-gray-200 bg-white/20' : ''}
                  `}
                  onClick={() => setToolCurrent("v")}
                >
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                </div>
              </div>

              <div className="w-1/2 rounded-lg border-2 border-white/40 p-1.5">
                <Slider defaultValue={50} color="white" />
              </div>
            </div>
            <WebButton href="/draw" className="flex-none" icon={<span className="icon-svg w-6 h-6"><img src="/images/ic_ready.svg" /></span>}>Xong</WebButton>
          </div>
        </div>

        <div className="w-36 bg-black/30 flex-none flex flex-wrap -mx-1 p-2 rounded-lg">
          { TOOLS.map((v,i) =>
            <div key={i} className="w-1/2 px-1 mb-2">
              <div 
                className={`w-full aspect-square rounded-lg border-2 text-white/40 border-current cursor-pointer
                  ${toolCurrent == v ? '!text-gray-200 bg-white/20' : ''}
                `}
                onClick={() => setToolCurrent(v)}
              ><span className="icon w-full h-full !text-3xl">{v}</span></div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DrawPage