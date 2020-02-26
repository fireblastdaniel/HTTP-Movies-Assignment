import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const history = useHistory();

  const addMovie = e => {
    e.preventDefault();
    history.push('/add-movie')
  }

  return (
    <div className="movie-list">
      <div className='add-movie-btn-container'>
        <button onClick={addMovie}>Add Movie</button>
      </div>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
