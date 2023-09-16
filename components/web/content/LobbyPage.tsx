"use client"

import Image from "next/image"
import WebButton from "../form/WebButton"
import { useEffect, useState } from "react"
import SimpleBarCustom from "../library/SimpleBar"
import WebSelect from "../form/WebSelect"
import useWebGameStore from "@/stores/web/webGame"

const LobbyPage = () => {
  const [tab, setTab] = useState<0 | 1>(0)

  const { name } = useWebGameStore()

  return (
    <>
      <style jsx global>{`
        html, body {
          --bg-from: #c026d3;
          --bg-to: #4f46e5;
        }
      `}</style>

      <WebButton href="/" variant="outlined" icon={<span className="icon-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path></svg>
      </span>} className="absolute top-5 left-5" >Quay về</WebButton>

      <div className="w-full h-full flex flex-col space-y-6">
        <div className="flex-none flex flex-col items-center justify-center space-y-2">
          <Image src="/images/logo.svg" alt="logo" width={200} height={200} className="h-20 w-auto" />
        </div>

        <div className="flex-grow min-h-0 flex items-stretch space-x-3">
          <div className="w-1/3 bg-[--border] rounded-lg flex flex-col space-y-3">
            <div className="flex-none p-2 text text-center text-xl  uppercase text-teal-300">
              Người chơi 1/ 4
            </div>
            <div className="flex-none px-6">
              <WebSelect className="uppercase w-full">
                <option value="4">4 người chơi</option>
              </WebSelect>
            </div>

            <div className="flex-grow min-h-0 pr-0.5">
              <SimpleBarCustom options={{autoHide: false}} className="p-2 pr-4">
                <div className="flex flex-col space-y-2">
                  { new Array(10).fill(0).map((v,i) =>
                    <div key={i} className={`rounded-r-[30px] rounded-l-[100px] border-2 border-indigo-300/30 bg-indigo-600/30 p-1.5 flex space-x-3 items-center
                      ${i == 0 ? '!bg-gray-300/90 !border-gray-300/90' : ''}
                    `}>
                      { i == 0
                        ? <div className="relative w-10 h-10 rounded-full border-2 border-indigo-800">
                          <Image src="/images/4.svg" alt="" width={100} height={100} className="absolute w-full bottom-0 left-0" />
                        </div>
                        : <div className="relative w-10 h-10 rounded-full border-2 border-transparent">
                          <Image src="/images/avt_empty.png" alt="" width={100} height={100} className="absolute w-full bottom-0 left-0" />
                        </div>
                      }
                      
                      <div className={`flex-grow min-w-0  uppercase text-indigo-300 ${i == 0 ? '!text-indigo-800' : ''}`}>Việt Hùng ít</div>
                      { i == 0
                        ? <span className="icon-svg w-6 h-6 p-1 rounded-full bg-indigo-600/80 text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" id="crown"><path d="M115.1,35.8c-5.9,0.1-10.8,5.3-10.5,11.2c0.1,3.3,1.7,6.1,4.1,8c-12.4,16.6-25,17.9-39.6-9.6 c5.2-2.6,8.1-9.2,4.3-15.8c-1.8-3.2-5.5-4.8-9.2-4.6c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.2,0c-3.7-0.1-7.3,1.4-9.2,4.6 c-3.8,6.6-0.9,13.2,4.3,15.8C44.3,72.9,31.7,71.6,19.3,55c2.4-1.9,4-4.8,4.1-8c0.2-5.9-4.6-11.1-10.5-11.2c-6.1-0.1-11,4.7-11,10.8 c0,5.9,4.8,10.8,10.8,10.8c0.4,0,0.9,0,1.3-0.1l4.1,40.2c0.3,3.2,3,5.6,6.2,5.6H64h39.7c3.2,0,5.9-2.4,6.2-5.6l4.1-40.2 c0.4,0.1,0.8,0.1,1.3,0.1c5.9,0,10.8-4.8,10.8-10.8C126.1,40.5,121.1,35.7,115.1,35.8z"></path></svg>
                        </span>
                        : null
                      }
                    </div>
                  )}
                </div>
              </SimpleBarCustom>
            </div>
          </div>

          <div className="w-2/3 px-4 flex flex-col">
            <div className="flex-none flex text-center">
              <div className={`w-1/2 text-xl rounded-t-lg bg-[--border] cursor-pointer  uppercase p-2 
                ${tab == 0 ? 'text text-teal-300' : 'mb-1 mr-1 text-gray-300'}`}
                onClick={() => setTab(0)}
              >
                Cài đặt sẵn
              </div>
              <div className={`w-1/2 text-xl rounded-t-lg bg-[--border] cursor-pointer  uppercase p-2 
                ${tab == 1 ? 'text text-teal-300' : 'mb-1 ml-1 text-gray-300'}`}
                onClick={() => setTab(1)}
              >
                Cài đặt tùy chỉnh
              </div>
            </div>

            <div className="flex-grow min-h-0 rounded-b-lg bg-[--border] flex items-center space-x-10 pr-0.5">
              <SimpleBarCustom options={{autoHide: false}} className="p-2 pr-4">
                { tab == 0
                  ? <div className="w-full h-full grid gap-2 grid-cols-3">
                    { new Array(20).fill(0).map((v,i) =>
                      <div key={i} className={`rounded-lg bg-white/70 border-[6px] border-transparent flex flex-col items-center
                        ${i == 0 ? '!border-teal-400 !bg-white/90' : ''}
                      `}>
                        <span className="icon-svg w-36 h-20">
                          <Image src="/images/ic_freestyle.svg" alt="" width={200} height={200} />
                        </span>
                        <span className="text-indigo-900 text-lg uppercase  py-1">Thường</span>
                      </div>
                    )}
                  </div>
                  : <div>
                    <p className=" text-xl text-center uppercase">CHỌN MỘT NHÂN VẬT VÀ Đăng nhập</p>
                    <p className="text-center mt-4">Chỉ người chơi đã đăng nhập mới có thể truy cập phòng chờ</p>
                  </div>
                }
              </SimpleBarCustom>
            </div>

            <div className="flex-none p-4 flex justify-center space-x-4">
              <WebButton icon={<span className="icon-svg w-6 h-6"><img src="/images/ic_copy.svg" /></span>}>Mời bạn</WebButton>
              <WebButton href="/start" icon={<span className="icon-svg w-6 h-6"><img src="/images/ic_play.svg" /></span>}>Băt đầu</WebButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LobbyPage