'use client'

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 left-8 w-12 h-12 bg-[#002952] border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#00E5FF] transition-all z-40 group shadow-2xl"
    >
      <i className="fas fa-chevron-up group-hover:-translate-y-1 transition-transform"></i>
    </button>
  )
}
