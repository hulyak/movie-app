import React from 'react';

//components
import Navigation from './elements/Navigation';
import MovieInfo from './elements/MovieInfo';
import MovieInfoBar from './elements/MovieInfoBar';
import Actor from './elements/Actor';
import Grid from './elements/Grid';
import Spinner from './elements/Spinner';

const Movie = ({ movieId }) => (
  <>
    <Navigation />
    <MovieInfo />
    <MovieInfoBar />
    <Grid >
      <Actor />
    </Grid>
    <Spinner/>
  </>
)
export default Movie;
