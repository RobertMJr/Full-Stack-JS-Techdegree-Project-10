import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);

function App() { 
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path={'/'} render={() => <Courses />} />
          <Route path={'/courses/:id'} render={() => <CourseDetail />} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path={'/signin'} component={UserSignInWithContext} />
          <Route path={'/error'} component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>    
  );

}

export default App;
