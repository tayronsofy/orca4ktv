import AdminPostForm from '@/components/admin/AdminPostForm'

export const dynamic = 'force-dynamic'

export default function NewPostPage() {
  return (
    <div className="min-h-screen">
      <AdminPostForm mode="new" />
    </div>
  )
}
