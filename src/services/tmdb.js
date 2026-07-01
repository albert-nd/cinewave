const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original'

const get = async (endpoint) => {
  const res = await fetch(`${BASE}${endpoint}&api_key=${API_KEY}`)
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

export const getTrending    = () => get('/trending/movie/week?language=en-US')
export const getPopular     = () => get('/movie/popular?language=en-US')
export const getTopRated    = () => get('/movie/top_rated?language=en-US')
export const getNowPlaying  = () => get('/movie/now_playing?language=en-US')
export const getUpcoming    = () => get('/movie/upcoming?language=en-US')
export const getMovieDetails= (id) => get(`/movie/${id}?language=en-US&append_to_response=credits,videos,similar`)
export const searchMovies   = (query) => get(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`)
export const getByGenre     = (genreId) => get(`/discover/movie?with_genres=${genreId}&language=en-US`)
export const getGenres      = () => get('/genre/movie/list?language=en-US')
