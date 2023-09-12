import { getCurrentUser } from '@/lib/web/getCurrentUser'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const layout = async ({
  searchParams, children
}: {
  searchParams: { [key: string]: string | undefined },
  children: ReactNode
}) => {
  const user = await getCurrentUser()

  if (user) {
    const url = searchParams?.url || '/'
    redirect(url)
  }

  return <>{children}</>
}

export default layout