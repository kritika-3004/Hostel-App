import React, { Component } from 'react';
import './App.css';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Students from './pages/Students';
import Maintenance from './pages/Maintenance';
import LateComer from './pages/LateComer';

import CreateStudents from './pages/CreateStudents';
import EditStudents from './pages/EditStudents'
class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path='/dashboard' component={Home} />
            <Route exact path='/dashboard/students' component={Students} />
            <Route exact path='/dashboard/students/create' component={CreateStudents} />
            <Route exact path='/dashboard/students/edit/:identity' component={EditStudents} />
            <Route exact path='/dashboard/maintenance' component={Maintenance} />
            <Route exact path='/dashboard/late-comer' component={LateComer} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
