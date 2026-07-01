import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieDetails, IMG_BASE, IMG_ORIGINAL } from '../services/tmdb'
import { useWatchlist } from '../context/WatchlistContext'
import TrailerModal from '../components/TrailerModal'
import MovieRow from '../components/MovieRow'

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showTrailer, setShowTrailer] = useState(false)
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await getMovieDetails(id)
        setMovie(data)
        window.scrollTo(0, 0)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!movie) return null

  const inList = isInWatchlist(movie.id)
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer') || movie.videos?.results?.[0]
  const cast = movie.credits?.cast?.slice(0, 10) || []
  const similar = movie.similar?.results || []
  const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Backdrop */}
      <div
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG_ORIGINAL}${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      </div>

      {/* Main content */}
      <div className="relative -mt-32 px-4 md:px-16 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-40 md:w-56 rounded-xl shadow-2xl flex-shrink-0 self-start"
          />

          {/* Info */}
          <div className="flex-1">
            <Link to="/" className="text-red-400 text-sm hover:text-red-300 mb-4 inline-block">
              ← Back to Home
            </Link>

            <h1 className="text-3xl md:text-5xl font-black mb-2">{movie.title}</h1>

            {movie.tagline && (
              <p className="text-gray-400 italic mb-4">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-4">
              <span className="text-yellow-400 font-bold">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>· {movie.release_date?.slice(0, 4)}</span>
              <span>· {runtime}</span>
              <span>· {movie.vote_count?.toLocaleString()} votes</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(g => (
                <span key={g.id} className="bg-red-500/20 border border-red-500/40 text-red-300 px-3 py-1 rounded-full text-xs">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  ▶ Watch Trailer
                </button>
              )}
              <button
                onClick={() => inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                className={`font-bold px-6 py-3 rounded-lg transition-colors ${
                  inList ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {cast.map(person => (
                <div key={person.id} className="flex-shrink-0 w-24 text-center">
                  <img
                    src={person.profile_path ? `${IMG_BASE}${person.profile_path}` : 'https://via.placeholder.com/96x144?text=?'}
                    alt={person.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                  />
                  <p className="text-white text-xs font-semibold line-clamp-1">{person.name}</p>
                  <p className="text-gray-400 text-xs line-clamp-1">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-12">
            <MovieRow title="Similar Movies" movies={similar} />
          </div>
        )}
      </div>

      {showTrailer && trailer && (
        <TrailerModal videoKey={trailer.key} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  )
}

export default MovieDetails
