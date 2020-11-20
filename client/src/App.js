import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() { 
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path={'/'} render={() => <Courses />} />
          <Route path={'/courses/:id'} render={() => <CourseDetail />} />
        </Switch>
      </div>
    </BrowserRouter>    
  );

}

export default App;
