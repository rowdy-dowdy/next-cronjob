"use client"

import useSettings from "@/stores/settings"
import { Avatar, Divider, Menu } from "@mui/material"
import { MenuItem } from "@mui/material"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode, useEffect, useRef, useState } from "react"
import WebButton from "../WebButton"
import { File } from "@prisma/client"
import { usePathname } from "next/navigation"
import WebContainer from "../WebContainer"
import { Socket, io } from "socket.io-client"
import LoginModal from "../modal/LoginModal"

const WebRootLayout = ({ children }: {
  children: ReactNode
}) => {
  const pathname = usePathname()

  const { findSettingByName } = useSettings()
  const logo = findSettingByName('site logo') as File | null

  const [showHeader, setShowHeader] = useState(!pathname?.split('/').includes('practice'))

  useEffect(() => {
    setShowHeader(!pathname?.split('/').includes('practice'))
  }, [pathname])

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

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white text-[#333] overflow-x-hidden">
        { showHeader
          ? <>
            <div className="fixed top-0 left-0 w-full h-16 px-8 shadow-sm shadow-gray-200 bg-white z-50">
              <div className="h-full flex items-center space-x-6">
                <a href="/" className="flex-none flex items-center space-x-1 py-3">
                  { logo
                    ? <Image src={logo.url || ''} alt="logo" width={logo.naturalWidth || 40} height={logo.naturalHeight || 40} className="w-10 h-10 rounded object-cover" />
                    : <img src="/logo2.png" alt="logo" className="w-10 h-10 rounded object-cover" />
                  }
                  <div className="logo-title">
                    <h1 className="text-lg font-semibold">Việt Hùng IT</h1>
                    <h5 className="text-xs text-gray-500">Developer . Transporter</h5>
                  </div>
                </a>
      
                <div className="hidden md:flex !ml-auto self-stretch items-stretch space-x-6">
                  <NavLink title="English News" />
                  <Dropdown title="IELTS Online Test" children={["IELTS Full Test", "IELTS Listening Practice", "IELTS Reading Practice"]} />
                  <NavLink title="Spell copy" />
                  <Dropdown title="IELTS Writing Sample" children={["IELTS Writing Sample Task 1", "IELTS Writing Sample Task 2", "IELTS Writing Sample Task 3"]} />
                  <Dropdown title="IELTS Speaking Sample" children={["IELTS Speaking Part 1", "IELTS Speaking Part 2", "IELTS Speaking Part 3"]} />
                </div>
      
                {/* user */}
                <div className="!ml-auto">
                  <AvatarUser />
                </div>
              </div>
            </div>
            <div className="flex-none w-full h-16 shadow-lg shadow-gray-200"></div>
          </>
          : null
        }
      
        <div className="flex-grow min-h-0 flex flex-col">
          {children}
        </div>
        { showHeader
          ? <div className="bg-slate-800 text-white">
            <WebContainer className="py-6">
              <div>
                { logo
                  ? <Image src={logo.url || ''} alt="logo" width={logo.naturalWidth || 40} height={logo.naturalHeight || 40} className="w-auto h-12" />
                  : <img src="/logo.png" alt="logo" className="w-auto h-12" />
                }
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6 flex flex-col space-y-2">
                  <p>Một sản phẩm thuộc Học viện Tiếng Anh Tư Duy VHI English (IELTS Việt Hùng) - www.viethung.fun</p>
                  <p><b>Hotline: </b>0399 633 237</p>
                  <p><b>Inbox: </b>viet.hung.2898@gmail.com</p>
                  <p><b>Theo dõi VHI tại</b></p>
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 rounded-full bg-white/30 grid place-items-center hover:scale-90 transition-transform">
                      <span className="icon-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
                      </span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/30 grid place-items-center hover:scale-90 transition-transform">
                      <span className="icon-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path></svg>
                      </span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/30 grid place-items-center hover:scale-90 transition-transform">
                      <span className="icon-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-2/3 px-3 mb-6">
                  <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="">
                      <p className="text-lg uppercase text-white/80 mb-2">LUYỆN THI IELTS</p>
                      <p>IELTS Online Test</p>
                      <p>IELTS Reading Practice</p>
                      <p>IELTS Listening Practice</p>
                    </div>
                    <div className="row-span-2">
                      <p className="text-lg uppercase text-white/80 mb-2">VỀ DOL IELTS ĐÌNH LỰC</p>
                      <p>Linearthinking</p>
                      <p>Nền tảng công nghệ</p>
                      <p>Đội ngũ giáo viên</p>
                      <p>Thành tích học viên</p>
                      <p>Khóa học tại DOL</p>
                      <p>Tạo CV và tìm việc miễn phí</p>
                    </div>
                    <div className="row-span-2">
                      <p className="text-lg uppercase text-white/80 mb-2">DOL LINEARSYSTEM</p>
                      <p>Từ điển Việt Anh</p>
                      <p>Kiến thức IELTS tổng hợp</p>
                      <p>Hệ thống luyện tập cho học viên</p>
                    </div>
                    <div className="">
                      <p className="text-lg uppercase text-white/80 mb-2">TIẾNG ANH TỔNG QUÁT</p>
                      <p>Chép chính tả</p>
                      <p>Tin tức tiếng anh</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t py-6 mt-4 flex space-x-2">
                <span>© 2023 VHI English. All rights reserved.</span>
                <div className="!ml-auto flex space-x-2 divide-x">
                  <span className="pl-2">Giới thiệu</span>
                  <span className="pl-2">Chính sách bảo mật</span>
                  <span className="pl-2">Điều khoản Sử dụng</span>
                </div>
              </div>
            </WebContainer>
          </div>
          : null
        }
      </div>

      <LoginModal />
    </>
  )
}

const NavLink = ({
  title
}: {
  title: string
}) => {
  return (
    <div className="relative h-full inline-flex items-center border-b-2 border-transparent hover:border-b-orange-600 font-semibold cursor-pointer">{title}</div>
  )
}

const Dropdown = ({
  title, children
}: {
  title: string,
  children: string[]
}) => {
  return (
    <div className="relative group">
      <p className="absolute w-full h-2 top-full left-0"></p>
      <div className="h-full flex items-center border-b-2 border-transparent hover:border-b-orange-600 font-semibold space-x-1 cursor-pointer">
        <span>{title}</span>
        <span className="icon w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg></span>
      </div>
      <div className="hidden group-hover:block w-60 absolute left-1/2 top-[calc(100%+.5rem)] -translate-x-1/2 bg-white shadow py-2 rounded">
        {children.map((v,i) =>
          <div key={i} className="px-4 py-2 hover:bg-gray-100 w-full truncate cursor-pointer">{v}</div>
        )}
      </div>
    </div>
  )
}

const AvatarUser = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const { data: session } = useSession()
  
  return (
    <>
      { session?.user
        ? <div className="relative">
          <div className="flex space-x-1 items-center" onClick={handleClick}>
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              { session.user?.image 
                ? <img src={session.user?.image} alt={`Photo by ${session.user?.name}`} className="w-full h-full object-cover border rounded-full" loading="lazy" />
                : <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                  <span className="icon icon-fill text-white !text-2xl">person</span>
                </div>
              }
            </div>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            disableScrollLock={true}
            className="font-medium"
          >
            <Link href="/app" className='flex items-center px-4 py-2 hover:bg-blue-100 text-blue-500'>
              <span className="icon mr-4">app_shortcut</span> Truy cập ứng dụng
            </Link>
            <Link href="/" className='flex items-center px-4 py-2 hover:bg-gray-100'>
              <span className="icon mr-4">upgrade</span> Tài khoản pro
            </Link>
            <Link href="/" className='flex items-center px-4 py-2 hover:bg-gray-100'>
              <span className="icon mr-4">star</span> Nhận ngay code free
            </Link>
            <div className='flex items-center px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500' onClick={() => signOut()}>
              <span className="icon mr-4">logout</span> Đăng xuất
            </div>
          </Menu>
        </div>
        : <WebButton href="/auth/login" className="rounded-lg">Sign up</WebButton>
      }
    </>
  )
}

export default WebRootLayout