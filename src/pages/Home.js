import React from 'react';

import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from '../config';

import HeroImage from '../components/Home/HeroImage';
import Grid from '../components/Grid.js';
import MovieThumb from '../components/Home/MovieThumb';
import SearchBar from '../components/Home/SearchBar';
import LoadMoreBtn from './components/LoadMoreBtn';
import Spinner from '../components/Home/Spinner';

import NoImage from './images/no_image.jpg';

// Custom Hook
import {useHomeFetch} from '../hooks/useHomeFetch';

const Home = () => {
  const {
    state,
    loading,
    error,
    setSearchTerm,
    setIsLoadingMore,
  } = useHomeFetch();
  console.log(state);

  if (error) return <div>Something went wrong</div>;

  // if we have a search word, show user search
  // const searchMovies = (search) => {
  //   const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

  //   setSearchTerm(search);
  //   fetchMovies(endpoint);
  // };

  // const loadMoreMovies = () => {
  //   const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${
  //     state.currentPage + 1
  //   } `; //give the other page
  //   const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.currentPage + 1}`;

  //   // show movies for search or load more
  //   const endpoint = searchTerm ? searchEndpoint : popularEndpoint;
  //   fetchMovies(endpoint);
  // };

  // if (error) return <div>Something went wrong...</div>;
  // if (!state.movies[0]) return <Spinner />; //show loader

  return (
    <>
      {/* don't show when user searches for a movie */}
      {/* {!searchTerm && state.results[0] ? ( */}
      {state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
          title={state.heroImage.original_title}
          text={state.heroImage.overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
        {state.movies.map((movie) => (
          <MovieThumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieId={movie.id}
            movieName={movie.original_title}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <LoadMoreBtn text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
      app
    </>
  );
};

export default Home;
