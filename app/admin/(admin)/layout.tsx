import AdminLayout from 'components/admin/AdminLayout';
import { cookies, headers } from 'next/headers';
import React from 'react';
import { useCurrentUserAdmin } from '@/lib/admin/helperServer';
import ClientOnly from '@/components/ClientOnly';
import { redirect, usePathname } from 'next/navigation';
import { getSettingsData } from '@/lib/admin/sample';

export default async function AdminRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  
  const user = await useCurrentUserAdmin()
  
  if (user == null) {
    const pathname = headers().get("x-invoke-path") || ""
    redirect(`/admin/login?url=${pathname}`)
  }

  return (
    // <ClientOnly>
      <AdminLayout userData={user} >
        {children}
      </AdminLayout>
    // </ClientOnly>
  )
}