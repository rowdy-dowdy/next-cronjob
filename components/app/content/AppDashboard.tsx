"use client"

import { formatCurrency } from "@/lib/utils/helper"
import AppContainer from "../ui/AppContainer"
import { Button } from "@mui/material"
import FormIOSSwitch from "@/components/FormIOSSwitch"
import Swiper, { Navigation, Pagination, EffectCoverflow } from 'swiper';
import { useEffect, useRef } from "react"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-coverflow";

const AppDashboard = () => {
  return (
    <AppContainer>
      <div className="flex items-center space-x-2 mt-6">
        <div className="font-semibold">
          <p className="text-[10px] uppercase text-gray-600">Total balance</p>
          <p className="text-4xl font-bold">{formatCurrency(100000)}</p>
        </div>

        <div className="!ml-auto"></div>
        <Button variant="contained" startIcon={<span className="icon">north_east</span>}>Send money</Button>
        <Button variant="outlined" startIcon={<span className="icon">add</span>}>Add money</Button>
        <Button variant="outlined"><span className="icon">more_horiz</span></Button>
      </div>

      <div className="flex flex-wrap -mx-3 mt-8">
        <div className="w-full lg:w-2/3 px-3 mb-6">
          <div className="border rounded p-6 h-80"></div>
        </div>
        <div className="w-full lg:w-1/3 px-3 mb-6">
          <div className="border rounded p-6 h-80"></div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mt-2">
        <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
          <div className="border rounded p-6 h-96 flex flex-col">
            <div className="flex-none flex justify-between">
              <p className="text-xl font-semibold">Recent Activity</p>

              <div className="p-1 rounded-full bg-gray-100">
                <div className="px-4 py-1.5 text-sm bg-white rounded-full shadow">
                  <span className="font-semibold">Virtual</span> (3)
                </div>
              </div>

              <a href="/app" className="text-blue-500 font-semibold hover:underline">See all payments</a>
            </div>

            <div className="flex-grow min-h-0 flex flex-col divide-y space-y-3">
              { new Array(4).fill(0).map((v,i) =>
                <div className="pt-3 flex items-center space-x-3">
                  <div className="icon w-10 h-10 rounded-xl bg-red-500 text-white">payments</div>
                  <div>
                    <p className="font-semibold">Flip burger</p>
                    <p className="text-gray-500 text-sm">5 transactions</p>
                  </div>

                  <div className="!ml-auto">
                    <p className="font-semibold text-green-500">+{formatCurrency(100000)}</p>
                    <p className="text-gray-500 text-sm">15min ago</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
          <div className="border rounded p-6 h-96 flex flex-col">
            <div className="flex-none flex justify-between">
              <p className="text-xl font-semibold">Cards</p>

              <div className="p-1 rounded-full bg-gray-100">
                <div className="px-4 py-1.5 text-sm bg-white rounded-full shadow">
                  <span className="font-semibold">Virtual</span> (3)
                </div>
              </div>

              <a href="/app" className="text-blue-500 font-semibold hover:underline">See all cards</a>
            </div>

            <div className="flex-grow min-h-0">
              <SlideCreditCard />
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  )
}

const SlideCreditCard = () => {

  const swiperEl = useRef(null)
  const swiper = useRef<Swiper | null>(null)

  useEffect(() => {
    if (swiperEl.current) {
      swiper.current = new Swiper(swiperEl.current, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 320,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        },
        modules: [Navigation, Pagination, EffectCoverflow],
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-custom-button-next',
          prevEl: '.swiper-custom-button-prev',
        },
      })
    }

    return () => {
      swiper.current?.destroy()
    }
  }, [])

  return (
    <div className="w-full h-full px-12 relative">
      <div ref={swiperEl} className="swiper w-full h-full">
        <div className="swiper-wrapper">
          { new Array(6).fill(0).map((v,i) =>
            <div key={i} className="swiper-slide !w-96 !flex items-center">
              <CreditCard />
            </div>
          )}
        </div>
        <div className="swiper-pagination"></div>
      </div>
      <div className="swiper-custom-button-prev absolute top-1/2 -translate-y-1/2 left-0 select-none">
        <div className="p-2 rounded-full shadow border bg-white hover:bg-gray-100 cursor-pointer">
          <span className="icon">chevron_left</span>
        </div>
      </div>
      <div className="swiper-custom-button-next absolute top-1/2 -translate-y-1/2 right-0 select-none">
        <div className="p-2 rounded-full shadow border bg-white hover:bg-gray-100 cursor-pointer">
          <span className="icon">chevron_right</span>
        </div>
      </div>
    </div>
  )
}

const CreditCard = () => {
  return (
    <div className="relative w-full pb-[50%] text-white">
      <div className="absolute w-full h-full top-0 left-0 border-b-2 bg-gradient-to-r from-zinc-800 to to-zinc-700 rounded-xl shadow">
        <div className="absolute w-full h-full top-0 left-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute left-2/3 bottom-0 w-1/2 h-full -skew-x-12 shadow-lg shadow-black bg-gradient-to-r from-red-500 to to-red-400"></div>
          <div className="absolute left-2/3 top-0 w-1/2 h-full skew-x-12 shadow-lg shadow-black bg-gradient-to-r from-red-500 to to-red-400"></div>
        </div>

        <div className="relative w-full h-full flex flex-col justify-between px-6 py-4 z-10">
          <div className="flex space-x-3 items-center text-sm">
            <p className="font-semibold">Active</p>
            <FormIOSSwitch size="small" />
          </div>

          <div className="text-xl font-semibold">Việt Hùng</div>

          <div className="flex space-x-3 text-xl">
            <input type="password" className="w-12" defaultValue="2463" disabled />
            <input type="password" className="w-12" defaultValue="2463" disabled />
            <input type="password" className="w-12" defaultValue="2463" disabled />
            <input type="text" className="w-12" defaultValue="2463" disabled />
          </div>

          <div className="flex space-x-3 items-center">
            <p className="font-semibold uppercase text-sm">EXP</p>
            <input type="text" className="w-10" defaultValue="08/27" disabled />

            <p className="font-semibold uppercase !ml-6 text-sm">CVC</p>
            <input type="password" className="w-10" defaultValue="08/27" disabled />

            <div className="!ml-auto text-2xl font-bold font-mono">VISA</div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default AppDashboard