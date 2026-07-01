import { useRef } from 'react'
import MovieCard from './MovieCard'

const MovieRow = ({ title, movies = [] }) => {
  const rowRef = useRef(null)

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir === 'left' ? -600 : 600, behavior: 'smooth' })
    }
  }

  if (!movies.length) return null

  return (
    <div className="mb-10">
      <h2 className="text-white text-xl font-bold mb-4 px-4 md:px-8">{title}</h2>

      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
        >
          ❮
        </button>

        {/* Scrollable row */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-8 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
        >
          ❯
        </button>
      </div>
    </div>
  )
}

export default MovieRow
