import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage_bak";
import ForgetPasswordPage from "./components/auth/ForgetPasswordPage";
import HomePage from "./components/HomePage";
import _Board from "./components/Board/Board";
import NotFound from "./components/notfound";
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <LoginPage /> */}
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forget-password" component={ForgetPasswordPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/board" component={_Board} />
          <Route path="/board/:id" component={_Board} />
          <Route path="/notfound" component={NotFound} />
          {/* <Route path="*" element={<Redirect to="/notfound" replace />} /> */}
        </Switch>
      </div>
    </Router>
  );
}
