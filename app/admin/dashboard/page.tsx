import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import AdminDashboardClient from './DashboardClient'

export const dynamic = 'force-dynamic'

export default function AdminDashboardPage() {
  const posts = getPosts()
  return <AdminDashboardClient posts={posts} />
}
