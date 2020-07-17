import React, { Component } from 'react'
import './App.css';

import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
//////////
import { connect } from 'react-redux';
import { decodeTheJWT } from './store/actions/user/user-actions';

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token'); 
    if(token) {
      this.props.decodeTheJWT(token);
    }
  }
  render() {
    return (
      <>
        <Navbar />
        <Switch>
            <Route exact path='/' component={Home} />
        </Switch>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  firstName: state.user.data.firstName
});

export default connect(mapStateToProps, { decodeTheJWT })(App);
