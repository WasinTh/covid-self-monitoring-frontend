import React from 'react';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';


export const PATH = {
  LOGIN: '/login',
  HOME: '/',
}

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path={PATH.LOGIN} component={LoginScreen} />
      <PrivateRoute exact path={PATH.HOME} component={HomeScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  )
}