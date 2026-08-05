// Shared admin design tokens — dark navy + amber.
// Page bg #000a1c · cards #002952 · inputs/inset #001f3f

export const inputCls =
  'w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors'

export const cardCls = 'bg-[#002952] border border-white/5 rounded-2xl p-6'

export const primaryBtnCls =
  'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-[#1a1200] font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'

export const secondaryBtnCls =
  'inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

export const dangerBtnCls =
  'inline-flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-sm px-5 py-2.5 rounded-xl border border-red-500/30 transition-colors disabled:opacity-50'

export const tableWrapCls = 'overflow-x-auto rounded-2xl border border-white/5 bg-[#002952]'

export const theadCls = 'text-left text-[11px] uppercase tracking-wider text-gray-400 border-b border-white/5'

export const rowHoverCls = 'hover:bg-white/[0.02] transition-colors'

export const labelCls = 'block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5'

export const accentLinkCls = 'text-amber-300 hover:text-amber-200 hover:underline'
