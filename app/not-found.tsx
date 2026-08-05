import Link from 'next/link'

// Static 404 UI. Admin-managed redirects execute in app/[...notFound]/page.tsx
// (the catch-all route), NOT here — this component must stay free of dynamic
// APIs or every route in the app loses static rendering.
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#001f3f] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-4">404</p>
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Page not found</h1>
      <p className="text-gray-400 text-lg mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="bg-[#003580] text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-wider hover:bg-[#003566] transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/iptv"
          className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-wider hover:bg-white/10 transition-colors"
        >
          View plans
        </Link>
      </div>
    </div>
  )
}
