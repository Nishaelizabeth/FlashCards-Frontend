function Decorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="absolute -left-6 top-24 h-16 w-16 rounded-full border-4 border-pink-500/80 animate-float-wide" />
      <span className="absolute left-8 top-40 h-10 w-10 rounded-full border-4 border-pink-400/70 animate-float-gentle [animation-delay:0.45s]" />
      <span className="absolute -left-4 top-64 h-6 w-6 rounded-full border-2 border-pink-300/70 animate-float-soft [animation-delay:0.9s]" />

      <span className="absolute -right-10 top-28 h-20 w-20 rounded-full border-4 border-pink-500/80 animate-float-wide [animation-delay:0.3s]" />
      <span className="absolute right-8 top-52 h-12 w-12 rounded-full border-4 border-pink-400/70 animate-float-gentle [animation-delay:0.75s]" />
      <span className="absolute -right-3 top-[20rem] h-7 w-7 rounded-full border-2 border-pink-300/70 animate-float-soft [animation-delay:1.1s]" />

      <span className="absolute right-[27%] top-20 h-3 w-3 rotate-45 border-2 border-amber-400" />
      <span className="absolute right-[24%] top-16 h-4 w-4 rotate-45 border-2 border-amber-300" />
      <span className="absolute right-[22%] top-24 h-2.5 w-2.5 rotate-45 border-2 border-amber-500" />

      <span className="absolute left-[39%] top-16 h-1.5 w-4 rounded-full bg-cyan-600/90" />
      <span className="absolute left-[40.5%] top-[4.6rem] h-4 w-1.5 rounded-full bg-cyan-600/90" />
    </div>
  )
}

export default Decorations
