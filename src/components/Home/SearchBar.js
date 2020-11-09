import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/search-icon.svg';

import { Wrapper, Content } from '../../styles/StyledSearchBar';

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState('');
  const initial = useRef(true); // mutable value

  useEffect(() => {
    // trigger when the user types not on mounting
    if (initial.current) {
      initial.current = false;
      return;
    }

     // debounce search
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);

  }, [setSearchTerm, state]);

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
