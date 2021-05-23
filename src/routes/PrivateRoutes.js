import React from "react";
import { isLoggedIn } from 'axios-jwt'
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const renderComponent = (props) => {
    if (isLoggedIn()) {
      return <Component {...props} />
    }
    else {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  };

  return <Route {...rest} render={renderComponent} />;
}
