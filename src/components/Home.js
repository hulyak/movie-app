import React, {useState} from 'react';
import {
  API_URL, 
  API_KEY, 
  IMAGE_BASE_URL, 
  POSTER_SIZE, 
  BACKDROP_SIZE 
} from '../config'

//import components
import Grid from './elements/Grid';
import LoadMoreBtn from './elements/LoadMoreBtn';
import MovieThumb from './elements/MovieThumb';
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Spinner from './elements/Spinner';

//Custom Hook
import {useHomeFetch} from './hooks/useHomeFetch'

import NoImage from './images/no_image.jpg';

const Home = () => {
  const [
    {
      state,
      // state : {movies, currrentPage, totalPages, heroImage},  //destructuring state
      loading, 
      error
    } , fetchMovies] = useHomeFetch();

  const [searchTerm, setSearchTerm] = useState("");

    const loadMoreMovies = () => {
    const searchEndpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${state.currentPage + 1} ` //give the other page
    const popularEndpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${state.currentPage + 1}`

    //show movies for search or load more 
    const endpoint = searchTerm ? searchEndpoint : popularEndpoint;
    fetchMovies(endpoint);
  }

  if(error) return <div>Something went wrong...</div>
  if(!state.movies[0]) return <Spinner />  //show loader
  
  return (
  <>
    <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
       title={state.heroImage.original_title}
       text={state.heroImage.overview}
       />
    <SearchBar />
    <Grid header={searchTerm ? 'Search Results' : 'Popular Movies' } >
     {state.movies.map(movie => (
       <MovieThumb 
       key={movie.id}
       clickable
       image={
            movie.poster_path 
        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
        :  NoImage
          }
          movieId={movie.id}
          movieName={movie.original_title}
          />
     ))}
    </Grid>

    {/* loading is true and show spinner */}
    {loading && <Spinner /> } 

    <LoadMoreBtn  text="Load More" callback={loadMoreMovies} />
  </>
  )
}



export default Home;