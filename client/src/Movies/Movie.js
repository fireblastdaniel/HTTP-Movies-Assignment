import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import axios from 'axios';
import MovieCard from './MovieCard';

const Movie = (props, { addToSavedList }) => {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    props.setUpdate(!props.update);
    history.push('/')
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <Link to={`/update-movie/${match.params.id}`}>
        <div className='update-button' onClick={() => props.setMovieToEdit(movie)}>
          Update
        </div>
      </Link>

      <div className='delete-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
