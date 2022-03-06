import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const key = process.env.REACT_APP_API_KEY;
const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${key}`;


function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('batman');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>

        <img src={SearchIcon} alt="Search"
          onClick={() => searchMovies(searchTerm)}/>

      </div>

      {
        movies?.length > 0 ?
        (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
      
    
    </div>
    );
}

export default App;
