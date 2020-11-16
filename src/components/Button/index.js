import React from 'react';
import PropTypes from 'prop-types';
import {Wrapper} from './StyledLoadMoreBtn';

const LoadMoreBtn = ({text, callback}) => (
  <Wrapper type="button" onClick={callback}>
    {text}
  </Wrapper>
);

LoadMoreBtn.propTypes = {
  text: PropTypes.string,
  callback: PropTypes.func,
};

export default LoadMoreBtn;
