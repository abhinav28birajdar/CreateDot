export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#0B0B0C] flex flex-col items-center justify-center p-6 transition-colors">
      <div className="flex flex-col items-center space-y-6 max-w-sm w-full text-center">
        {/* Animated Brand Mark */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#14161F] text-white flex items-center justify-center shadow-xl shadow-[#14161F]/15 animate-bounce">
            <span className="text-xl font-black text-[#FF6B6B]">CD</span>
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#FF6B6B]/30 to-[#FFE185]/20 blur-xl -z-10 animate-pulse" />
        </div>

        {/* Pulse Bar */}
        <div className="space-y-2 w-full">
          <div className="h-1.5 w-full bg-[#14161F]/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE185] rounded-full w-2/3 animate-[pulse_1s_ease-in-out_infinite]" />
          </div>
          <p className="text-xs font-bold text-[#647087] dark:text-[#9DA7C2] tracking-wider uppercase">
            Loading CreateDOT Experience...
          </p>
        </div>
      </div>
    </div>
  )
}
