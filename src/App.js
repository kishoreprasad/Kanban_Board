import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage_bak";
import ForgetPasswordPage from "./components/auth/ForgetPasswordPage";
import HomePage from "./components/HomePage";
import _Board from "./components/Board/Board";
import { Redirect } from "react-router-dom";
export default function App() {
  //const isAuthenticated = getToken();
  return (
    <Router>
      <div>
        <Switch>
          {/* <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
            <LoginPage />
          </PrivateRoute> */}
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forget-password" component={ForgetPasswordPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/board" component={_Board} />
          <Route exact path="/board/:id" component={_Board} />
          <Redirect from="/" to="/" />
        </Switch>
      </div>
    </Router>
  );
}
