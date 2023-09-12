"use client"

import { ReactNode, useState } from "react"
import AppContainer from "../ui/AppContainer"
import Image from "next/image"
import useSettings from "@/stores/settings"
import { File } from "@prisma/client"
import Link from "next/link"
import { Menu } from "@mui/material"
import { Session } from "next-auth";
import { UserType } from "@/lib/web/getCurrentUser"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

const AppLayout = ({ 
  children, user
 }: { 
  children: ReactNode, user: NonNullable<UserType>
 }) => {
  const { findSettingByName } = useSettings()
  const logo = findSettingByName('site logo') as File | null
  const pathname = usePathname()

  // https://dribbble.com/shots/20960468-Fincome-Digital-Banking-Dashboard

  const links = [
    { title: 'Dashboard', link: '/app' },
    { title: 'Activities', link: '/app/' },
    { title: 'Card', link: '/app/' },
    { title: 'Billing', link: '/app/' },
    { title: 'Report', link: '/app/' }
  ]

  return (
    <div className="w-full min-h-screen flex flex-col">
      <style jsx global>{`
        body {
          overflow-x: hidden
        }
      `}</style>
      <header className="flex-none sticky top-0 bg-white z-50">
        <AppContainer>
          <div className="flex items-center space-x-3 py-3 border-b">
            <a href="/app" className="flex-1">
              { logo
                ? <Image src={logo.url || '/logo.png'} alt="logo" width={logo.naturalWidth || 40} height={logo.naturalHeight || 40} className="w-auto h-10" />
                : <img src="/logo.png" alt="logo" className="w-auto h-10" />
              }
            </a>
            <div className="flex-grow flex justify-center space-x-3 font-semibold text-gray-600">
              { links.map((v,i) =>
                <Link key={i} href={v.link} className={`px-4 p-2 rounded hover:bg-gray-100 transition-colors
                  ${pathname == v.link ? '!bg-blue-100 !text-blue-600': ''}`}
                >{v.title}</Link>
              )}
            </div>
            <AvatarUser user={user} />
          </div>
        </AppContainer>
      </header>

      <div className="flex-grow min-h-0">{children}</div>
      
      <div className="flex-none text-end text-xs p-1 text-gray-600">
        © 2023 <a href="https://github.com/rowdy-dowdy" target="_blank" className="hover:text-blue-600">Việt Hùng Ít</a>. All Rights Reserved.
      </div>
    </div>
  )
}

const AvatarUser = ({ user }: { user: NonNullable<UserType> }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  
  return (
    <div className="flex-1 flex justify-end text-[#222]">
      <div 
        className="flex items-center space-x-2 rounded-full p-1 pr-2 bg-gray-100 hover:bg-gray-200 cursor-pointer select-none"
        onClick={handleClick}
      >
        <div className={`w-10 h-10 rounded-full overflow-hidden ${!user.image ? 'bg-blue-500' : ''} grid place-items-center`}>
          { user.image
            ? <Image src={user.image} alt="use profile" width={100} height={100} className='w-full h-full object-cover' />
            : <span className="icon icon-fill !text-white !text-2xl">
              person
            </span>
          }
        </div>
        <div className='font-semibold'>{user.name}</div>
        <span className="icon icon-fill">
          arrow_drop_down
        </span>
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
        {/* <Link href="/app" className='flex items-center px-4 py-2 hover:bg-blue-100 text-blue-500'>
          <span className="icon mr-4">app_shortcut</span> Truy cập ứng dụng
        </Link> */}
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
  )
}

export default AppLayout