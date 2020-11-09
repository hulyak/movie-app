import {useState, useEffect, useCallback} from 'react';
import API from '../API'

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);

      const movie  = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      // Get directors only
      const directors = credits.crew.filter(
        (member) => member.job === 'Director'
      );

      setState({
        ...movie,
        actors: credits.cast,
        directors,
      });

      setLoading(false)

    } catch (error) {
      setError(true);
    }
  }, [movieId]);


  useEffect(() => {
    fetchData();
  }, [movieId, fetchData])

 //only change when movieId changes

  // useEffect(
  //   () => {
  //     console.log('grabbing from local storage');
  //     if (localStorage[movieId]) {
  //       setState(JSON.parse(localStorage[movieId]));
  //       setLoading(false);
  //     } else {
  //       console.log('grabbing from api');
  //       fetchData();
  //     }
  //   },
  //   [fetchData, movieId] // dependency array or infinite loop
  // );

  // useEffect(() => {
  //   localStorage.setItem(movieId, JSON.stringify(state));
  // }, [movieId, state]);

  return {state, loading, error};
};
