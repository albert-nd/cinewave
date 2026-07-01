import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies, IMG_BASE } from '../services/tmdb'
import { Link } from 'react-router-dom'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return

    const fetchMovies = async () => {
      setLoading(true)
      try {
        const data = await searchMovies(query)
        setMovies(data.results || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [query])

  return (
    <div className="pt-24 px-4 md:px-8 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">
        {query ? `Results for "${query}"` : 'Search'}
      </h1>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && query && movies.length === 0 && (
        <p className="text-gray-400">No results found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="group">
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
              {movie.poster_path ? (
                <img
                  src={`${IMG_BASE}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm p-2 text-center">
                  No image
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-300 truncate">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Search