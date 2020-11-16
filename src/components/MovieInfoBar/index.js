import React from 'react';
import PropTypes from 'prop-types';
import {calcTime, convertMoney} from '../../helpers';
import {Wrapper, Content} from './StyledMovieInfoBar';

const MovieInfoBar = ({time, budget, revenue}) => (
  // <FontAwesome className="fa-time" name="clock-o" size="2x" />
  <Wrapper>
    <Content>
      <div className='column'>
        <p>Running time: {calcTime(time)}</p>
      </div>
      <div className='column'>
        <p>Budget: {convertMoney(budget)}</p>
      </div>
      <div className='column'>
        <p>Revenue: {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>
);

MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number,
};

export default MovieInfoBar;
