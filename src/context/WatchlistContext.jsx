import { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('watchlist')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (movie) => {
    setWatchlist(prev =>
      prev.find(m => m.id === movie.id) ? prev : [...prev, movie]
    )
  }

  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(m => m.id !== id))
  }

  const isInWatchlist = (id) => watchlist.some(m => m.id === id)

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => useContext(WatchlistContext)
