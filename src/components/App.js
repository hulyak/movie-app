import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {GlobalStyle} from './styles/GlobalStyle.js';

import Header from './elements/Header';
import Home from './Home';
import Movie from './Movie';
import NotFound from './NotFound';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" elements={<Home />} />
      <Route path="/:movieId" elements={<Movie />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
);

export default App;
