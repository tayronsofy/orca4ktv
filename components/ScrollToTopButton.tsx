'use client'

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 left-8 w-12 h-12 bg-[#2c3034] border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#a855f7] transition-all z-40 group shadow-2xl"
    >
      <i className="fas fa-chevron-up group-hover:-translate-y-1 transition-transform"></i>
    </button>
  )
}
