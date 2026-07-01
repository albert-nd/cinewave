import { useEffect, useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import {
  getTrending, getPopular, getTopRated, getNowPlaying, getUpcoming, getMovieDetails,
} from '../services/tmdb'

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null)
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [trendData, popData, topData, nowData, upData] = await Promise.all([
          getTrending(), getPopular(), getTopRated(), getNowPlaying(), getUpcoming(),
        ])
        setTrending(trendData.results)
        setPopular(popData.results)
        setTopRated(topData.results)
        setNowPlaying(nowData.results)
        setUpcoming(upData.results)

        const featured = trendData.results[Math.floor(Math.random() * 5)]
        const details = await getMovieDetails(featured.id)
        setHeroMovie(details)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-white text-base sm:text-xl animate-pulse text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <HeroBanner movie={heroMovie} />
      <div className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 pb-10 sm:pb-16 space-y-1 sm:space-y-2">
        <MovieRow title="🔥 Trending This Week" movies={trending} />
        <MovieRow title="🎬 Now Playing" movies={nowPlaying} />
        <MovieRow title="⭐ Top Rated" movies={topRated} />
        <MovieRow title="🍿 Popular" movies={popular} />
        <MovieRow title="🗓 Coming Soon" movies={upcoming} />
      </div>
    </div>
  )
}

export default Home