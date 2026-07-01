import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { IMG_BASE } from '../services/tmdb'

const MovieCard = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const inList = isInWatchlist(movie.id)

  const posterUrl = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-900 flex-shrink-0 w-36 sm:w-44 md:w-48">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-white text-sm font-bold line-clamp-2 mb-1">{movie.title}</h3>
          <p className="text-gray-400 text-xs mb-2">
            ⭐ {movie.vote_average?.toFixed(1)} · {movie.release_date?.slice(0, 4)}
          </p>
        </Link>

        <button
          onClick={() => inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
          className={`w-full text-xs py-1.5 rounded font-semibold transition-colors duration-200 ${
            inList
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          {inList ? '✓ In Watchlist' : '+ Watchlist'}
        </button>
      </div>

      {/* Rating badge */}
      <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs px-1.5 py-0.5 rounded font-bold">
        ⭐ {movie.vote_average?.toFixed(1)}
      </div>
    </div>
  )
}

export default MovieCard
