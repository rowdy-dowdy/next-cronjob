import db from '@/lib/admin/prismadb'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || ""

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    }
  ]
}