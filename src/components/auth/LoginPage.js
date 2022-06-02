import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/home");
      });
  };
  const signInWithEmail = (email, password) => {
    firebase
      .login({
        email: email,
        password: password,
      })
      .then(() => {
        history.push("/home");
      });
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
      <p>
        <label>Username or email address</label>
        <br />
        <input type="text" name="email" required />
      </p>
      <p>
        <label>Password</label>
        <br />
        <input type="password" name="password" required />
      </p>
      <p>
        <button
          onclick={(event) => {
            event.preventDefault();
            signInWithEmail(email, password);
          }}
          className="primary-button"
          id="sub_btn"
          type="submit"
        >
          login
        </button>
      </p>
    </div>
  );
};
export default SignIn;
