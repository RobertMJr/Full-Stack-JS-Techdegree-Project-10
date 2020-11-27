import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './PrivateRoute';

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);


function App() { 
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" render={() => <Courses />} />
          <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/forbidden" component={Forbidden}/>
          <Route path="/error" component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>    
  );

}

export default App;
