import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const SignIn = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then((e) => {
        //console.log(e.user.uid);
        dispatch({
          type: "LOGIN_SUCCESS",
          uid: e.user.uid,
        });
        history.push("/home");
      });
  };
  const signInWithEmail = (email, password) => {
    firebase
      .login({
        email: email,
        password: password,
      })
      .then((e) => {
        //console.log(e.user.user.uid);
        dispatch({
          type: "LOGIN_SUCCESS",
          uid: e.user.user.uid,
        });
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
