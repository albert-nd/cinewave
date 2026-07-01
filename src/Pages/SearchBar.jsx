import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  return (
    <div className="flex items-center bg-gray-700 text-white rounded-full w-full px-3 py-2">
      <span className="text-gray-300 text-sm mr-2">🔍</span>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleChange}
        className="bg-transparent focus:outline-none w-full text-sm placeholder-gray-400"
      />
    </div>
  )
}

export default SearchBar
