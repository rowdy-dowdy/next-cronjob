"use client"

import { animate, useMotionValue, motion } from "framer-motion"
import Image from "next/image";
import { useEffect, useRef, useState, MouseEvent } from "react";
import WaitTime from "../ui/WaitTime";
import WebButton from "../form/WebButton";
import { Slider } from "@mui/material";
import { addAlpha } from "@/lib/utils/helper";

const colors = ["#09090b",  "#737373",  "#ef4444", "#fff", "#d4d4d8", "#f97316", 
  "#eab308", "#b91c1c", "#c2410c", "#a16207", "#84cc16", "#14b8a6",
  "#22c55e", "#3b82f6", "#8b5cf6", "#15803d", "#1d4ed8", "#4338ca", 
  "#d946ef", "#ec4899", "#f43f5e"]

const tools = ["draw", "ink_eraser", "square", "circle", "change_history", "pen_size_2", "colorize", "clear_all", "turn_slight_left", "turn_slight_right"]

const lineWidths = [3, 6, 9, 12, 15]

const DrawPage = () => {
  const [colorCurrent, setColorCurrent] = useState(colors[0])
  const [toolCurrent, setToolCurrent] = useState(tools[0])
  const [globalAlpha, setGlobalAlpha] = useState(100)
  const [lineWidthCurrent, setLineWidthCurrent] = useState(lineWidths[0])

  const canvasEl = useRef<HTMLCanvasElement>(null)
  const rootCanvasEl = useRef<HTMLCanvasElement>(null)
  
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasOffset = useRef({ w: 0, h: 0 })

  useEffect(() => {
    if (!canvasEl.current || !rootCanvasEl.current) return

    canvasOffset.current = {
      w: canvasEl.current.offsetWidth, 
      h: canvasEl.current.offsetHeight
    }

    canvasEl.current.width = rootCanvasEl.current.width = canvasEl.current.offsetWidth
    canvasEl.current.height = rootCanvasEl.current.height = canvasEl.current.offsetHeight

    const ctx = canvasEl.current.getContext('2d') as CanvasRenderingContext2D
    const ctx2 = rootCanvasEl.current.getContext('2d') as CanvasRenderingContext2D

    ctx.lineCap = ctx2.lineCap = "round"
    ctx.lineJoin = ctx2.lineJoin = 'round'

    ctx.globalCompositeOperation = "destination-atop"
  }, [])

  const paths = useRef<{
    color: string, opacity: number, 
    points: { x: number, y:number }[],
    lineWidth: number
  }[]>([])

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasEl.current) return

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    if (rootCanvasEl.current) {
      drawPath(rootCanvasEl.current, paths.current)
    }

    const path = {
      color: colorCurrent,
      opacity: globalAlpha / 100,
      lineWidth: lineWidthCurrent,
      points: [{ x, y }]
    }

    paths.current.push(path)

    drawPath(canvasEl.current, path)

    setIsDrawing(true)
  }

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasEl.current) return

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    const currentPath = paths.current[paths.current.length - 1]
    currentPath.points.push({ x, y })

    drawPath(canvasEl.current, currentPath)
  }

  const handleMouseUp = () => {
    if (!canvasEl.current) return

    setIsDrawing(false)
  }

  const drawPath = (canvas: HTMLCanvasElement, path: any | any[]) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let paths = []

    if (Array.isArray(path)) {
      paths = path
      ctx.clearRect(0, 0, canvasOffset.current.w, canvasOffset.current.h)
    }
    else {
      paths.push(path)
    }

    paths.forEach(v => {
      ctx.strokeStyle = v.color
      ctx.globalAlpha = v.opacity
      ctx.lineWidth = v.lineWidth
      ctx.beginPath()
  
      const startPoint = v.points[0]
      ctx.moveTo(startPoint.x, startPoint.y)
  
      for (const point of v.points) {
        ctx.lineTo(point.x, point.y)
      }
  
      ctx.stroke()
    })
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          --bg-from: #e9423a;
          --bg-to: #e72c7a;
        }
      `}</style>

      <div className="absolute top-4 left-4 text-center text-5xl">1/9</div>

      <WaitTime className="absolute right-4 top-4" duration={120} color="#ba3a64" />
      
      <div className="h-full flex space-x-4 items-center">
        <div className="w-36 flex-none bg-black/30 flex flex-wrap -mx-1 p-2 rounded-lg">
          { colors.map((v,i) =>
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
              <div className="w-full h-full relative">
                <canvas
                  ref={rootCanvasEl}
                  className="absolute w-full h-full top-0 left-0 rounded-b-lg overflow-hidden bg-white"
                ></canvas>
                <canvas
                  ref={canvasEl}
                  className="relative w-full h-full rounded-b-lg overflow-hidden"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}

                ></canvas>
              </div>
            </div>
          </div>

          <div className="flex-none flex space-x-4 items-center">
            <div className="flex-grow bg-black/30 rounded-lg p-2 flex space-x-2">
              <div className="w-1/2 rounded-lg border-2 border-white/40 p-1.5 flex justify-around">
                { lineWidths.map((v,i) =>
                  <div key={i}
                    className={`w-9 h-9 rounded-full border-2 text-white/40 border-current cursor-pointer grid place-items-center
                      ${lineWidthCurrent == v ? '!text-gray-200 bg-white/20' : ''}
                    `}
                    onClick={() => setLineWidthCurrent(v)}
                  >
                    <div className="rounded-full bg-current" style={{ width: v * 1.5, height: v * 1.5 }}></div>
                  </div>
                )}
              </div>

              <div className="w-1/2 rounded-lg border-2 border-white/40 p-1.5">
                <Slider value={globalAlpha} onChange={(e, v) => setGlobalAlpha(v as number)} min={0} max={100} color="white" />
              </div>
            </div>
            <WebButton href="/draw" className="flex-none" icon={<span className="icon-svg w-6 h-6"><img src="/images/ic_ready.svg" /></span>}>Xong</WebButton>
          </div>
        </div>

        <div className="w-36 bg-black/30 flex-none flex flex-wrap -mx-1 p-2 rounded-lg">
          { tools.map((v,i) =>
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