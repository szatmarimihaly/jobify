

const GlowLine = () => {
  return (
    <div className="relative my-4 flex justify-center">
      {/* Glow */}
      <div className="absolute h-1 w-60 md:w-100 rounded-full bg-linear-to-r from-teal-400 to-blue-400 blur-md opacity-70"></div>

      {/* Core line */}
      <div className="h-1 w-60 md:w-100 rounded-full bg-linear-to-r from-teal-400 to-blue-400 shadow-[0_0_20px_rgba(56,189,248,0.7)]"></div>
    </div>
  )
}

export default GlowLine