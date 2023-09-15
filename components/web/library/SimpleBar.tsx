"use client"
import { ReactNode, useEffect, useRef } from "react"
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
import { twMerge } from "tailwind-merge";

const SimpleBarCustom = ({ 
  children, className, options
}: { 
  children?: ReactNode, className?: string,
  options?: Partial<SimpleBar['options']>
 }) => {
  const barEl = useRef(null)

  const commonClasses = twMerge('w-full h-full', className)

  useEffect(() => {
    if (barEl.current) {
      new SimpleBar(barEl.current, options)
      window.ResizeObserver = ResizeObserver
    }
  }, [])

  return (
    <div ref={barEl} className={commonClasses}>
      <style jsx global>{`
        .simplebar-scrollbar:before {
          width: 5px;
          background: white;
        }
      `}</style>
      {children}
    </div>
  )
}

export default SimpleBarCustom