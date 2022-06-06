import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  //console.log(store.getState());
  return (
    <div className="text-center">
      <div className="App-header">
        <h3>MX Kanban</h3>
      </div>
      <h1 className="main-title home-page-title">Welcome</h1>
      <Link to="/">
        <button className="primary-button">Log out</button>
      </Link>
      <Link to="/board">
        <button className="primary-button">Go to Board</button>
      </Link>
    </div>
  );
}
