import React from 'react';
import {useParams} from 'react-router-dom'
// components
import BreadCrumb from '../components/BreadCrumb';
import MovieInfo from '../components/MovieInfo';
import MovieInfoBar from '../components/MovieInfoBar';
import Actor from '../components/Actor';
import Grid from '../components/Home/Grid';
import Spinner from '../components/Home/Spinner';

// hooks
import {useMovieFetch} from '../hooks/useMovieFetch';

const Movie = () => {

  const { movieId } = useParams;  // from react-router-dom variable for movieID

  const {state : movie, loading, error}= useMovieFetch(movieId); // custom hook

  if (error) return <div> Something went wrong </div>;
  if (loading) return <Spinner />;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor key={actor.credit_id} actor={actor} />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
