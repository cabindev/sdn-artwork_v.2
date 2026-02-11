
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="glass rounded-3xl p-8 flex flex-col items-center gap-4">
        <div className="glass-spinner"></div>
        <span className="text-sm opacity-60">Loading...</span>
      </div>
    </div>
  )
}
