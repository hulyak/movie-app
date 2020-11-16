import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Image} from './StyledMovieThumb';

const Thumb = ({image, movieId, clickable}) => (
  <div>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <Image className="clickable" src={image} alt="movie thumb" />
      </Link>
    ) : (
      <Image src={image} alt="movie thumb" /> // not clickable image
    )}
  </div>
);

Thumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
};

export default Thumb;
