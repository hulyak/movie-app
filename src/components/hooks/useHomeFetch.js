import { useState, useEffect } from 'react';
import { POPULAR_BASE_URL } from '../../config';

export const useHomeFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // console.log(state);

  const fetchMovies = async (endpoint) => {
    setError(false);
    setLoading(true);
    // console.log(state);
    //await for data and json

    const isLoadMore = endpoint.search('page'); //if there is 't page query it will return -1, append to old movies

    try {
      const result = await (await fetch(endpoint)).json();
      // console.log(result)
      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...result.results] //append result to the old movies
            : [...result.results], //results property from api
        heroImage: prev.heroImage || result.results[0], //first check if we have already heroImage don't replace
        currentPage: result.page,
        totalPages: result.total_pages,
      }));
    } catch (err) {
      setError(true);
      console.log(err);
    }
    setLoading(false);
  };

  //TRIGGER FETCH MOVIES, this will trigger every time we run, we need only when we start the app and mount the app
  useEffect(() => {
    fetchMovies(POPULAR_BASE_URL);
  }, []); //dependency array

  return [{ state, loading, error }, fetchMovies];
};
