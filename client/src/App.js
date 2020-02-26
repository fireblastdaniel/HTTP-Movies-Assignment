import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from './Movies/MovieUpdate';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [update, setUpdate] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log(res)
        setMovieList(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [update]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie 
          addToSavedList={addToSavedList} 
          setMovieToEdit={setMovieToEdit}
          update={update}
          setUpdate={setUpdate}
        />
      </Route>

      <Route path='/update-movie/:id'>
        <MovieUpdate 
          movie={movieToEdit} 
          update={update} 
          setUpdate={setUpdate} 
        />
      </Route>
    </>
  );
};

export default App;
