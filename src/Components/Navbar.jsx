import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { watchlist } = useWatchlist()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link to="/" className="text-red-500 font-black text-2xl tracking-tight">
          CINEWAVE
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-red-500 text-sm transition-colors">Home</Link>
          <Link to="/search" className="text-gray-300 hover:text-red-500 text-sm transition-colors">Movies</Link>
          <Link to="/watchlist" className="text-gray-300 hover:text-red-500 text-sm transition-colors flex items-center gap-1">
            Watchlist
            {watchlist.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{watchlist.length}</span>
            )}
          </Link>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 gap-2">
          <span className="text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none w-44"
          />
        </form>

        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 px-4 pb-6 flex flex-col gap-4 border-t border-white/10">
          <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-full px-4 py-2 gap-2 mt-4">
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none w-full"
            />
          </form>
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-red-500">Home</Link>
          <Link to="/search" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-red-500">Movies</Link>
          <Link to="/watchlist" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-red-500 flex items-center gap-2">
            Watchlist
            {watchlist.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{watchlist.length}</span>
            )}
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar