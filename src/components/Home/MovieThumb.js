import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Image} from '../../styles/StyledMovieThumb';

const MovieThumb = ({image, movieId, clickable}) => (
  <Image>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <img className="clickable" src={image} alt="movie thumb" />
      </Link>
    ) : (
      <img src={image} alt="movie thumb" /> // not clickable image
    )}
  </Image>
);

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
};

export default MovieThumb;
