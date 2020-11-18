import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Courses from './components/Courses';

function App() { 
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={'/'} render={() => <Courses />} />
      </Switch>
      
    </BrowserRouter>    
  );

}

export default App;
