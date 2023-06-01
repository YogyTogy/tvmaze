import React from 'react';

import HomePage from './components/HomePage';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
        <Routes>
          {/* <Route path="/contacts" element={<Contacts />} /> */}
          <Route path="/" element={<HomePage />} />
        </Routes>
    </Router>
  );
};

export default App;
