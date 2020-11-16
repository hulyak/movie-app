import {useState, useEffect} from 'react';
import API from '../API';

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
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;
    // load the second page
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [searchTerm, isLoadingMore, state.page]);

  return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};
};

// const isLoadMore = endpoint.search('page'); // if there is 't page query it will return -1, append to old movies
// try {
//   // wait for fetching data and to parse into json data
//   const result = await (await fetch(endpoint)).json();
//   // console.log(result);
//   setState((prev) => ({
//     ...prev,
//     movies:
//       isLoadMore !== -1
//         ? [...prev.movies, ...result.results] // append result to the old movies
//         : [...result.results], // results property from api
//     heroImage: prev.heroImage || result.results[0], // first check if we have already heroImage don't replace
//     currentPage: result.page,
//     totalPages: result.total_pages,
//   }));
// } catch (err) {
//   setError(true);
//   console.log(err);
// }
// setLoading(false);

// TRIGGER FETCH MOVIES, this will trigger every time we run, we need only when we start the app and mount the app
// useEffect(() => {
//   if (sessionStorage.homeState) {
//     // console.log('grabbing from session storage');
//     setState(JSON.parse(sessionStorage.homeState));
//     setLoading(false);
//   } else {
//     // console.log('grabbing from api');
//     fetchMovies(POPULAR_BASE_URL);
//   }
// }, []); // dependency array

// useEffect(() => {
//   if (!searchTerm) {
//     console.log('session storage');
//     sessionStorage.setItem('homeState', JSON.stringify(state));
//   }
// }, [searchTerm, state]);

// return [{state, loading, error, setSearchTerm}, fetchMovies];

