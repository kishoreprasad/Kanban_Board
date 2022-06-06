import React from "react";
import { FaPhotoVideo, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function HomePage() {
  const firebase = useFirebase();
  const history = useHistory();
  const dispatch = useDispatch();
  function signout() {
    firebase.logout().then(() => {
      dispatch({
        type: "SIGNOUT_SUCCESS",
      });
      history.push("/");
    });
  }
  return (
    <div className="text-center">
      <div className="App-header">
        <h3>
          MX Kanban
          <div style={{ float: "right" }}>
            <button onClick={() => signout()}>
              <span>
                <FaSignOutAlt />
                {"Logout"}
              </span>
            </button>
          </div>
        </h3>
      </div>
      <h1 className="main-title home-page-title">Welcome</h1>
      <Link to="/board">
        <button className="primary-button">Go to Board</button>
      </Link>
    </div>
  );
}
