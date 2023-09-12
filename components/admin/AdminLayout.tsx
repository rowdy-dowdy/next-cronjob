"use client"

import useAdminMenu from '@/stores/admin/adminMenu';
import ClientOnly from 'components/ClientOnly';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useAdminUser from 'stores/admin/adminUser';
import HeaderAdmin from './HeaderAdmin';
import MenuAdmin from './MenuAdmin';
import { useStoreCustom } from '@/stores';
import { SnackbarProvider } from 'notistack';
import { AdminUserType } from '@/lib/admin/helperServer';
import { io, Socket } from 'socket.io-client';
import { TABLES_SAMPLE } from '@/app/admin/(admin)/(sample)/[slug]/table';

export type LinkState = {
  icon?: string,
  name: string,
  path: string,
  tableName?: string
}

export const MANAGER_LINKS: LinkState[] = [
  {
    icon: 'dashboard',
    name: "Bảng điều khiển",
    path: "/admin"
  }, 
  ...TABLES_SAMPLE.filter(v => !["users", "roles", "settings"].includes(v.slug)).map(v => ({
    icon: v.icon,
    name: v.name,
    path: '/admin/' + v.slug,
    tableName: v.tableName 
  }))
]

export const GENERAL_LINKS: LinkState[] = [
  {
    icon: 'person',
    name: "Người dùng",
    tableName: 'admin',
    path: "/admin/users"
  },
  {
    icon: 'key',
    name: "Quyền",
    tableName: 'role',
    path: "/admin/roles"
  },
  {
    icon: 'settings',
    name: "Cài đặt",
    tableName: 'setting',
    path: "/admin/settings"
  }
]

const AdminLayout : React.FC<{
  children: React.ReactNode,
  userData: NonNullable<AdminUserType>
}> = ({children, userData}) => {

  const adminMenu = useStoreCustom(useAdminMenu, (state) => state)

  return (
    <ClientOnly>
      <div className='w-full min-h-screen bg-gray-100'>
        <MenuAdmin managerLinks={MANAGER_LINKS} generalLinks={GENERAL_LINKS} permissions={userData.role.permissions}/>
        <div 
          className='w-full transition-all'
          style={{paddingLeft: adminMenu?.open ? adminMenu?.width : "60px"}}
        >
          <HeaderAdmin managerLinks={MANAGER_LINKS} generalLinks={GENERAL_LINKS} adminUser={userData} />
          <div className="px-8 py-4">{children}</div>
        </div>
      </div>
    </ClientOnly>
  )
}

export default AdminLayout