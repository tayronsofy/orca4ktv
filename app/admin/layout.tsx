import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin · Orca 4K TV',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#000a1c] overflow-auto">
      {children}
    </div>
  )
}
