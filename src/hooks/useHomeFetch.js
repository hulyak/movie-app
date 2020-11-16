import {useState, useEffect} from 'react';
import API from '../API';
import { isPersistedState } from '../helpers';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // console.log(searchTerm);
  // console.log(state);

  const fetchMovies = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);
      // await for data and json
      const movies = await API.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial and search
  useEffect(() => {
    // first check the session storage
  if (!searchTerm) {
    const sessionState = isPersistedState('homeState'); // homestate will be passed to session storage
    if(sessionState){
      setState(sessionState);
      return;
    }
  }
  setState(initialState);
  fetchMovies(1, searchTerm);
}, [searchTerm]);


// Load more
  useEffect(() => {
    if (!isLoadingMore) return;
    // load the second page
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [searchTerm, isLoadingMore, state.page]);


  // Write to session storage
  useEffect(() => {
  if(!searchTerm) {
    sessionStorage.setItem('homeState', JSON.stringify(state))
  }
}, [searchTerm, state]);

  return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};
};



