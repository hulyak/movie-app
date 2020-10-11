import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/search-icon.svg';

import {Wrapper, Content} from '../../styles/StyledSearchBar';

const SearchBar = ({setSearchTerm}) => {
  const [state, setState] = useState('');
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  const doSearch = (event) => {
    // console.log(event.target.value);
    const {value} = event.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search icon" />
        <input
          type="text"
          placeholder="Search movie"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default SearchBar;
