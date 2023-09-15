import React, { ReactNode } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { getSettingsData } from '@/lib/admin/sample';
import { findSettingByName } from '@/lib/admin/fields';
import { AuthProvider } from '@/components/web/AuthProviders';

export async function generateMetadata(
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const settings = await getSettingsData()

  const siteTitle = findSettingByName(settings, "site title")
  const siteDescription = findSettingByName(settings, "site description")
  const siteLogo = findSettingByName(settings, "site logo")
 
  return {
    metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
    title: siteTitle || "Việt Hùng It",
    description: siteDescription || 'Việt Hùng It lập trình viên web, mobile, hệ thống',
    authors: {
      name: 'Việt Hùng It',
      url: 'https://github.com/rowdy-dowdy'
    },
    twitter: {
      title: siteTitle || "Việt Hùng It",
      description: siteDescription || 'Việt Hùng It lập trình viên web, mobile, hệ thống',
      images: siteLogo ? siteLogo?.url : null,
    },
    openGraph: {
      title: siteTitle || "Việt Hùng It",
      description: siteDescription || 'Việt Hùng It lập trình viên web, mobile, hệ thống',
      url: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
      siteName: siteTitle || "Việt Hùng It",
      images: siteLogo ? siteLogo?.url : null,
      type: 'website',
    },
  }
}

const layout = async ({children}: {children: ReactNode}) => {
  return (
    <>{children}</>
    // <AuthProvider>{children}</AuthProvider>
  )
}

export default layout
