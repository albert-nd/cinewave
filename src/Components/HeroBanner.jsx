import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { IMG_ORIGINAL } from '../services/tmdb'
import TrailerModal from '../Components/TrailerModal'

const HeroBanner = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false)
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  if (!movie) return null

  const inList = isInWatchlist(movie.id)
  const backdropUrl = `${IMG_ORIGINAL}${movie.backdrop_path}`

  return (
    <>
      <div
        className="relative w-full h-[70vh] md:h-screen flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-4 md:px-16 pb-16 md:pb-24 max-w-2xl">
          <p className="text-red-500 text-sm font-bold uppercase tracking-widest mb-2">Featured</p>

          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-3">
            {movie.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="text-yellow-400 font-bold">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>·</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>·</span>
            <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">HD</span>
          </div>

          <p className="text-gray-300 text-sm md:text-base line-clamp-2 sm:line-clamp-3 mb-6">
            {movie.overview}
          </p>

          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setShowTrailer(true)}
              className="bg-white/5 border-3 border-red-700 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-red-700 duration-300 transition-colors flex items-center gap-2"
            >
              ▶ Watch Trailer
            </button>

            <Link
              to={`/movie/${movie.id}`}
              className="bg-white/5 border-3 border-red-700 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-red-700 duration-300 transition-colors"
            >
              ℹ More Info
            </Link>

            <button
              onClick={() => inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
              className={`font-bold px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg duration-300 transition-colors ${
                inList ? 'bg-white/5 border-3 border-red-700 text-white hover:bg-red-700' : 'bg-white/5 border-3 border-red-700 text-white hover:bg-red-700'
              }`}
            >
              {inList ? '✓ In Watchlist' : '+ Watchlist'}
            </button>
          </div>
        </div>
      </div>

      {showTrailer && movie.videos?.results?.length > 0 && (
        <TrailerModal
          videoKey={movie.videos.results.find(v => v.type === 'Trailer')?.key || movie.videos.results[0].key}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  )
}

export default HeroBanner
