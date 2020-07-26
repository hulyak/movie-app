import React from 'react';
import {StyledMovieThumb} from '../styles/StyledMovieThumb';


const MovieThumb = ({image, movieId, clickable}) => (
    <StyledMovieThumb>
    {clickable ? (
        <img className="clickable" src={image} alt="moviethumsb" /> 
    ): (
      <img src={image} alt="moviethumb" />  //not clickable image
    )}
    </StyledMovieThumb>
)
export default MovieThumb;
