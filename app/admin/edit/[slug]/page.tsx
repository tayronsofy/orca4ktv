import { notFound } from 'next/navigation'
import { getPost } from '@/lib/posts'
import AdminPostForm from '@/components/admin/AdminPostForm'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  return (
    <div className="min-h-screen">
      <AdminPostForm mode="edit" post={post} />
    </div>
  )
}
