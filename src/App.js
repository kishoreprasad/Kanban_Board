import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage_bak";
import ForgetPasswordPage from "./components/auth/ForgetPasswordPage";
import HomePage from "./components/HomePage";
import _Board from "./components/Board/Board";
import NotFound from "./components/notfound";
export default function App() {
  //const isAuthenticated = getToken();
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute>
            {/* <LoginPage /> */}

            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route
              exact
              path="/forget-password"
              component={ForgetPasswordPage}
            />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/board" component={_Board} />
            <Route exact path="/board/:id" component={_Board} />
            {/* <Route path= component={NotFound} /> */}
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
