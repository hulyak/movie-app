import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {GlobalStyle} from './styles/GlobalStyle.js';

import Header from './components/elements/Header';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:movieId" element={<Movie />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
);

export default App;
