"use client"
import { motion } from "framer-motion";

const LoadingPage = () => {
  return <motion.div 
      initial={{ opacity: 0 }}
      animate={ {opacity: 1 }}
    className='absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-teal-900 overflow-hidden'
    >
    <lottie-player
      autoplay
      loop
      mode="normal"
      src="/lotties/loading.json"
      className="w-full h-full object-contain max-w-xs"
    />
  </motion.div>
}

export default LoadingPage