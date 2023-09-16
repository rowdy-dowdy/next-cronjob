"use client"
import { animate, useMotionValue, motion, color } from 'framer-motion'
import {useEffect} from 'react'
import { twMerge } from 'tailwind-merge'

const WaitTime = ({
  className, duration = 60, onComplete, color = "var(--text2)"
}: {
  className?: string,
  duration?: number,
  onComplete?: () => void,
  color?: string
}) => {
  const strokeDasharray = useMotionValue(`calc(0 * 31.4 / 100) 31.4`)

  const commonClasses = twMerge(
    `w-14 h-14 border-4 p-0.5 rounded-full`,
    className
  )

  useEffect(() => {
    const anim = animate(strokeDasharray, `calc(100 * 31.4 / 100) 31.4`, { 
      duration,
      onComplete
    })

    return () => {
      anim.stop()
      anim.cancel()
    }
  }, [])

  return (
    <div className={commonClasses}>
      <span className="icon-svg w-full h-full">
        <svg height="20" width="20" viewBox="0 0 20 20">
          <circle r="9" cx="10" cy="10" fill="currentColor" />
          <motion.circle r="5" cx="10" cy="10" fill="transparent"
            stroke={color}
            strokeWidth="10"
            style={{ strokeDasharray }}
            strokeDasharray="calc(0 * 31.4 / 100) 31.4"
            transform="rotate(-90) translate(-20)" />
        </svg>
      </span>
    </div>
  )
}

export default WaitTime