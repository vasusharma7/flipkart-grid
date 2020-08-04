import React, { Component } from "react";
// import * as action from "../redux/registerRedux/registerAction";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";
import Header from "./Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Blogs from "../Blogs.jsx";
class Landing extends Component {
  render() {
    return (
      <>
        {this.props.loggedIn && (
          <Notifications notifications={this.props.notifications} />
        )}
        <Header />
        <Switch>
          <Route path="/home/blogs" component={() => <Blogs />} />
          <Route path="/home">
            <></>
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loggedIn: state.loginReducer.loggedIn,
    //   error: state.loginReducer.error,
    notifications: state.notifications,
    //   loading: state.loginReducer.loading,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     login: data => dispatch(action.login(data)),
//   };
// };

export default connect(mapStateToProps)(Landing);
