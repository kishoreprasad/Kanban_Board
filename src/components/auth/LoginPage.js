import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    // return (
    //   <div className="text-center">
    //     <div className="App-header">
    //       <h3>MX Kanban</h3>
    //     </div>
    //     <h2>Sign in</h2>
    //     <form action="/home">
    //       <p>
    //         <label>Username or email address</label>
    //         <br />
    //         <input type="text" name="first_name" required />
    //       </p>
    //       <p>
    //         <label>Password</label>
    //         <Link to="/forget-password">
    //           <label className="right-label">Forget password?</label>
    //         </Link>
    //         <br />
    //         <input type="password" name="password" required />
    //       </p>
    //       <p>
    //         <button
    //           onclick="/home"
    //           className="primary-button"
    //           id="sub_btn"
    //           type="submit"
    //         >
    //           login
    //         </button>
    //       </p>
    //     </form>
    //     <p>
    //       First time? <Link to="/register">Create an account</Link>.
    //     </p>
    //   </div>
    // );
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
