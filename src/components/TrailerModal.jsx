import { useEffect } from 'react'

const TrailerModal = ({ videoKey, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video"
        onClick={e => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
          className="w-full h-full rounded-xl"
          allowFullScreen
          allow="autoplay"
          title="Movie Trailer"
        />
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl hover:text-red-400 transition-colors font-bold"
        >
          ✕ Close
        </button>
      </div>
    </div>
  )
}

export default TrailerModal
