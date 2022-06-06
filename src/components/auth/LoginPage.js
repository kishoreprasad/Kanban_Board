import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signInWithGoogle = () => {
    console.log("login success");
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/home");
        //update redux state on login information
        dispatchEvent({
          type: "LOGIN SUCCESS",
          payload: {
            isLoggedIn: true,
            user: firebase.auth().currentUser,
          },
        });
      });
  };
  const signInWithEmail = (email, password) => {
    console.log("login success");
    firebase
      .login({
        email: email,
        password: password,
      })
      .then(() => {
        history.push("/home");
        console.log("login success");
        dispatchEvent({
          type: "LOGIN SUCCESS",
          payload: {
            isLoggedIn: true,
            user: firebase.auth().currentUser,
          },
        });
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
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </p>
      <p>
        <label>Password</label>
        <br />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </p>
      <p>
        <button
          onClick={(event) => {
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
