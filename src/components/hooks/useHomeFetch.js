import {useState, useEffect} from 'react';
import {API_URL, API_KEY} from '../../config';

export const useHomeFetch = () => {
  const [state, setState] = useState({movies: []})
  const [loading, setLoading] = useState(false);
  const [error, setError ] =useState(false);

  // console.log(state);

  const fetchMovies = async endpoint => { 
    setError(false);
    setLoading(true);
    // console.log(state);
    //await for data and json 
    try{
      const result = await(await fetch(endpoint)).json();
      // console.log(result)
      setState(prev => ({
        ...prev,
        movies : [...result.results], //results property from api
        heroImage : prev.heroImage || result.results[0] ,//first check if we have already heroImage don't replace
        currentPage : result.page,
        totalPages : result.total_pages,
      }))
    }catch(err){
      setError(true);
      console.log(err)
    }
    setLoading(false);
  }

  //TRIGGER FETCH MOVIES, this will trigger eveytime we run, we need only when we start the app and mount the app
  useEffect(() => {
    fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
  }, []) //dependency array

  return [{state, loading, error} , fetchMovies];
}