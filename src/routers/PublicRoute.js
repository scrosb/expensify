import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated, 
  component:Component,
  //takes out all of the stuff that we did not destructure
  ...rest
}) => (
  <Route {...rest} component={(props) => 
    (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ): (
      <div>
        <Component  {...props}/>
      </div>
      )
    )
  }/> 
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);