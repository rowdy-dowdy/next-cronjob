import ClientOnly from '@/components/ClientOnly'
import AppLayout from '@/components/app/layouts/AppLayout'
import { getCurrentUser } from '@/lib/web/getCurrentUser'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const layout = async ({children}: {children: ReactNode}) => {
  const data = await getCurrentUser()

  if (!data) {
    redirect('/auth/login')
  }

  return (
    <AppLayout user={data}>{children}</AppLayout>
  )
}

export default layout