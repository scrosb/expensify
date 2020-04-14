//Higher Order Component- A component (HOC) that renders another component
//Reuse code
//Render hijacking
//Prop Manipulation
//Abstract State


import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  //we're passing props using object spread directly down to the child component
  return (props) => (
    <div>
        {props.isAdmin && <p>This is Private Info. Please Don't share</p>}
      <WrappedComponent {...props}/>
    </div>
  )
}
 const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props}/>
      ) : (
        <p>You are not logged in.</p>
      )}
      
    </div>
  )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


ReactDOM.render(<AuthInfo isAuthenticated={true} info="these are the details" />, document.getElementById('app'));