import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMovies(saved);
  }, []);

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl mb-4">Watchlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

    </div>
  );
};

export default Watchlist;