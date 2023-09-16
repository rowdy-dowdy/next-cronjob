"use client"

import Image from "next/image"
import { memo, useEffect, useRef, useState } from "react";
import Swiper, { Pagination, Autoplay } from "swiper";
import styles from "../layouts/screen.module.css";

import 'swiper/css';
import 'swiper/css/pagination';
import WebButton from "../form/WebButton";
import WebInput from "../form/WebInput";
import useWebGameStore from "@/stores/web/webGame";

const HomePage = () => {
  const [tab, setTab] = useState<0 | 1>(0)
  const { name, setName } = useWebGameStore()

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div className="flex-none flex flex-col items-center justify-center space-y-2">
        <Image src="/images/logo.svg" alt="logo" width={200} height={200} className="h-28 w-auto" />
        <div className="text uppercase ">Tam sao thất bản</div>
      </div>

      <div className="flex-grow min-h-0 w-full flex space-x-6 px-4">
        <div className="w-3/5 px-4 flex flex-col">
          <div className="flex-none flex text-center">
            <div className={`w-1/2 text-xl rounded-t-lg bg-[--border] cursor-pointer  uppercase p-2 
              ${tab == 0 ? 'text text-teal-300' : 'mb-1 mr-1 text-gray-300'}`}
              onClick={() => setTab(0)}
            >
              Ẩn danh
            </div>
            <div className={`w-1/2 text-xl rounded-t-lg bg-[--border] cursor-pointer  uppercase p-2 
              ${tab == 1 ? 'text text-teal-300' : 'mb-1 ml-1 text-gray-300'}`}
              onClick={() => setTab(1)}
            >
              Đã xác thực
            </div>
          </div>

          <div className="flex-grow min-h-0 bg-[--border] flex items-center space-x-10 px-8">
            <div className="flex-none relative w-40 h-40 rounded-full border-4 border-gray-100">
              <img src="images/4.svg" className="absolute bottom-0 left-0 w-full" />
            </div>
            <div className="flex-grow">
              { tab == 0
                ? <>
                  <p className=" text-xl text-center uppercase">CHỌN MỘT NHÂN VẬT VÀ BIỆT DANH</p>
                  <WebInput 
                    type="text" 
                    className="text-2xl w-full mt-4" placeholder="Tên hay 123" required
                    value={name} onChange={(e) => setName(e.target.value)} 
                  />
                </>
                : <>
                  <p className=" text-xl text-center uppercase">CHỌN MỘT NHÂN VẬT VÀ Đăng nhập</p>
                  <p className="text-center mt-4">Chỉ người chơi đã đăng nhập mới có thể truy cập phòng chờ</p>
                </>
              }
            </div>
          </div>

          <div className="flex-none bg-[--border] rounded-b-lg p-4 flex justify-center space-x-4">
            <WebButton href="/lobby" icon={<span className="icon-svg w-6 h-6"><img src="/images/ic_play.svg" /></span>}>Băt đầu</WebButton>
          </div>
        </div>

        <div className="w-2/5 rounded-lg border-[3px] border-[--border] p-4 text-center flex flex-col space-y-4">
          <div className="flex-none text text-xl  text-teal-300 uppercase">Cách chơi</div>

          <div className="flex-grow min-h-0">
            <SlideGuide />
          </div>
        </div>
      </div>

      <div className="flex-none flex items-end justify-between text-white/50 ">
        <Image src="/logo.png" alt="logo" width={200} height={200} className="h-10 w-auto" />
        <span>© 2023 <a href="https://github.com/rowdy-dowdy" target="_blank" className="hover:text-blue-600">Việt Hùng Ít</a>. All Rights Reserved.</span>
      </div>
    </div>
  )
}

const SlideGuide = memo(() => {
  const swiperEl = useRef(null)
  const swiper = useRef<Swiper | null>(null)

  useEffect(() => {
    if (swiperEl.current) {
      swiper.current = new Swiper(swiperEl.current, {
        slidesPerView: 1,
        loop: true,
        modules: [Pagination, Autoplay],
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: '.swiper-custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `
              <div class="pagination-item ${className}">
                <span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="transform: rotate(-90deg);">
                    <circle cx="100" cy="100" r="90" stroke="currentColor" stroke-width="20" fill="none" stroke-linecap="round"
                      stroke-dasharray="565.48" stroke-dashoffset="565.48"
                    ></circle>
                  </svg>
                </span>
              </div>
            `
          }
        }
      })
    }

    return () => {
      swiper.current?.destroy()
    }
  }, [])

  return (
    <div ref={swiperEl} className="swiper w-full h-full">
      <div className="swiper-wrapper">
        { new Array(6).fill(0).map((v,i) =>
          <div key={i} className="swiper-slide !flex flex-col">
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="/lotties/draw.json"
              className="flex-grow min-h-0 w-full object-contain"
            />
            <div className="flex-none pb-14 pt-2">
              <p className=" text-lg">{i+1}. Gọi sẽ tốt hơn</p>
              <p>Mời bạn bè của bạn tham gia một cuộc gọi thoại (ví dụ: Discord, Zoom)</p>
            </div>
          </div>
        )}
      </div>
      <div className={`swiper-custom-pagination ${styles.swiperCustomPagination}`}></div>
    </div>
  )
})

export default HomePage