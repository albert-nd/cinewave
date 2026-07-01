import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import Navbar from "./Components/NavBar";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Watchlist from "./Pages/Watchlist";
import Search from "./Pages/Search";
import Footer from "./Components/Footer";

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <div className="bg-gray-900 dark:bg-black min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;