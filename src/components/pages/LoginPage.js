import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

export default function SignInPage() {
  return (
    <div className="text-center">
      <div className="App-header">
        <h3>MX Kanban</h3>
      </div>
      <h2>Sign in</h2>
      <form action="/home">
        <p>
          <label>Username or email address</label>
          <br />
          <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password">
            <label className="right-label">Forget password?</label>
          </Link>
          <br />
          <input type="password" name="password" required />
        </p>
        <p>
          <button
            onclick="/home"
            className="primary-button"
            id="sub_btn"
            type="submit"
          >
            login
          </button>
        </p>
      </form>
      <p>
        First time? <Link to="/register">Create an account</Link>.
      </p>
    </div>
  );
}